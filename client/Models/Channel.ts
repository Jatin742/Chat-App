import { ContactEnum } from "@/enum/ContactEnum";
import { IBaseContact } from "@/interface/IBaseContact";

export interface Channel extends IBaseContact{
    name: string;
    contactType: ContactEnum.CHANNEL
}