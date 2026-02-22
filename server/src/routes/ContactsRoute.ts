import { Router } from "express";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController";
import { verifyToken } from "../middlewares/AuthMiddleWare";

const contactsRoute = Router();

contactsRoute.get('/search', verifyToken, searchContacts);
contactsRoute.get('/get-contacts-for-dm', verifyToken, getContactsForDMList);

export default contactsRoute;