import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleWare";
import { getMessages } from "../controllers/MessagesController";

const messagesRoute = Router();

messagesRoute.get('/get-messages/:id', verifyToken, getMessages);

export default messagesRoute;