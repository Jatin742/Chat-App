import { Router } from "express";
import { searchContacts } from "../controllers/ContactsController";
import { verifyToken } from "../middlewares/AuthMiddleWare";

const contactsRoute = Router();

contactsRoute.get('/search', verifyToken, searchContacts);

export default contactsRoute;