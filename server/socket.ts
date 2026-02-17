import { DefaultEventsMap, Server as SockerIoServer, Socket } from 'socket.io';
import { Server as HttpServer } from "http";
import { IMessage } from './src/interface/IMessage';
import Message from './src/models/MessagesModel';

const setUpSocket = (server: HttpServer) => {
    const io = new SockerIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    const userSocketMap = new Map();

    const disconnect = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
        console.log(`Client Disconnected ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    const sendMessage = async (message: IMessage) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);
        
        const createdMessage = await Message.create(message);

        const messageData = await Message.findById(createdMessage.__v).populate("sender", "id email firstName lastName image color").populate("recipient", "id email firstName lastName image color");

        if(recipientSocketId){
            io.to(recipientSocketId).emit('receiveMessage', messageData);
        }
        if(senderSocketId){
            io.to(senderSocketId).emit('receiveMessage', messageData);
        }

    }

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId as string;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User ${userId} connected with socket ID ${socket.id}`);
        }
        else {
            console.log('User ID not provided in handshake query');
        }
        socket.on('sendMessage', sendMessage);
        socket.on('disconnect', () => {
            disconnect(socket);
        });
    });

}

export default setUpSocket;