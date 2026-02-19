'use client';

import { HOST } from "@/app/lib/utils/constants";
import { useAppStore } from "@/store";
import { createContext, useContext, useEffect, useRef } from "react";
import {io, Socket} from "socket.io-client";


const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketContext)
}

export interface IMessage {
  _id: string;
  sender: {
    _id: string;
  };
  recipient: {
    _id: string;
  };
  content: string;
  messageType: "text" | "file";
  timeStamp: Date;
}


export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socket = useRef<Socket | null>(null);
    const {userInfo} = useAppStore();
    useEffect(() => {
        if(userInfo){
            socket.current = io(HOST,{
                withCredentials: true,
                query: {
                    userId: userInfo._id
                }
            });
            
            socket.current.on('connect', () => {
                console.log('Connected to Socket.IO server with ID:', socket.current?.id);
            });

            const handleReceiveMessage = (message: IMessage) => {
                const { selectedChatData, selectedChatType, addMessage } =useAppStore.getState();
                console.log("Here 1 ",selectedChatData );
                
                if(selectedChatType !== undefined && (selectedChatData?._id === message.sender._id || selectedChatData?._id === message.recipient._id)){
                    console.log("njfa", message);
                    // console.log("newfwifwkfm");
                    
                    addMessage(message);
                }
            }

            socket.current.on("receiveMessage", handleReceiveMessage);
            return () => {                
                socket.current?.disconnect();
                console.log('Disconnected from Socket.IO server');
            }
        }
    }, [userInfo]);
    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}