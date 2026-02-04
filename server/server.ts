import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/AuthRoutes";

dotenv.config({ debug: false });

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL as string;

app.use(cors({
    origin: [process.env.ORIGIN as string],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use('/uploads/profiles', express.static('uploads/profiles'));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

mongoose.connect(databaseURL).then(() => {
    console.log('DB Connecion Successfull');
});