import { StateCreator } from "zustand";
import { IBaseContact } from "@/interface/IBaseContact";
import { ContactEnum } from "@/enum/ContactEnum";
import { MessageType } from "@/types/MessageType";
import { ContactType } from "@/types/ContactType";


export interface ChatSlice {
  selectedChatType?: ContactEnum;
  selectedChatData?: ContactType;
  selectedChatMessages: MessageType[];
  directMessagesContacts: ContactType[];
  setSelectedChatType: (chatType: ContactEnum) => void;
  setSelectedChatData: (chat: ContactType) => void;
  setSelectedChatMessages: (messages: MessageType[]) => void;
  setDirectMessagesContacts: (contacts: ContactType[]) => void;
  closeChat: () => void;
  addMessage: (message: MessageType) => void;
}

export const createChatSlice: StateCreator<
  ChatSlice,
  [],
  [],
  ChatSlice
> = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  setSelectedChatType: (chatType) => set({ selectedChatType: chatType }),
  setSelectedChatData: (chat) => set({ selectedChatData: chat }),
  setSelectedChatMessages: (messages) =>
    set({ selectedChatMessages: messages }),
  setDirectMessagesContacts: (contacts) => set({ directMessagesContacts: contacts }),
  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    // const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [...selectedChatMessages, message]
    })
  }
});
