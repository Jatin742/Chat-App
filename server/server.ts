import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/AuthRoutes";
import contactsRoute from "./src/routes/ContactsRoute";
import setUpSocket from "./socket";
import messagesRoute from "./src/routes/MessagesRoute";

dotenv.config({ debug: false });

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL as string;
const allowedOrigins = process.env.ORIGIN ? process.env.ORIGIN.split(",") : [];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use('/uploads/profiles', express.static('uploads/profiles'));
app.use('/uploads/files', express.static('uploads/files'));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoute);
app.use('/api/messages', messagesRoute);

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

setUpSocket(server);

mongoose.connect(databaseURL).then(() => {
    console.log('DB Connecion Successfull');
});