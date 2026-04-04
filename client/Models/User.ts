import { ContactEnum } from "@/enum/ContactEnum";
import { IBaseContact } from "@/interface/IBaseContact";

export interface User extends IBaseContact{
    firstName: string;
    lastName: string;
    email: string;
    contactType: ContactEnum.USER
}