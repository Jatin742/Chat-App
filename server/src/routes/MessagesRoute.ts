import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleWare";
import { getMessages, uploadFile } from "../controllers/MessagesController";
import multer from "multer";

const messagesRoute = Router();
const upload = multer({ dest: 'uploads/files' });

messagesRoute.get('/get-messages/:id', verifyToken, getMessages);
messagesRoute.post('/upload-file', verifyToken, upload.single('file'), uploadFile);

export default messagesRoute;