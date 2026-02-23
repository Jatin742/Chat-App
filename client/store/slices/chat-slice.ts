import { IMessage } from "@/context/SocketContext";
import { StateCreator } from "zustand";
import { IBaseContact } from "@/interface/IBaseContact";
import { ContactType } from "@/enum/ContactType";


export interface ChatSlice {
  selectedChatType?: ContactType;
  selectedChatData?: IBaseContact;
  selectedChatMessages: IMessage[];
  directMessagesContacts: IBaseContact[];
  setSelectedChatType: (chatType: ContactType | undefined) => void;
  setSelectedChatData: (chat: IBaseContact | undefined) => void;
  setSelectedChatMessages: (messages: IMessage[]) => void;
  setDirectMessagesContacts: (contacts: IBaseContact[]) => void;
  closeChat: () => void;
  addMessage: (message: IMessage) => void;
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
