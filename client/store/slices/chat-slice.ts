import { IMessage } from "@/context/SocketContext";
import { StateCreator } from "zustand";
import { IUser } from "@/interface/IUser";


export interface ChatSlice {
  selectedChatType?: string;
  selectedChatData?: IUser;
  selectedChatMessages: IMessage[];
  directMessagesContacts: IUser[];
  setSelectedChatType: (chatType: string | undefined) => void;
  setSelectedChatData: (chat: IUser | undefined) => void;
  setSelectedChatMessages: (messages: IMessage[]) => void;
  setDirectMessagesContacts: (contacts: IUser[]) => void;
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
