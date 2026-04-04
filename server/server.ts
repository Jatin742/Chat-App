import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import authRoutes from "./src/routes/AuthRoutes";
import contactsRoute from "./src/routes/ContactsRoute";
import messagesRoute from "./src/routes/MessagesRoute";
import setUpSocket from "./socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL as string;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));



// ✅ Static files
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoute);
app.use("/api/messages", messagesRoute);


// ✅ Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Socket setup
setUpSocket(server);

// ✅ MongoDB connection
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("DB Connection Error:", err));