import { StateCreator } from "zustand";

export interface Chat {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  color: number;
  profileSetup: boolean;
  image?: string;
}

export interface ChatSlice {
  selectedChatType?: string;
  selectedChatData?: Chat;
  selectedChatMessages: any[];

  setSelectedChatType: (chatType: string | undefined) => void;
  setSelectedChatData: (chat: Chat | undefined) => void;
  setSelectedChatMessages: (messages: any[]) => void;
  closeChat: () => void;
}

export const createChatSlice: StateCreator<
  ChatSlice,
  [],
  [],
  ChatSlice
> = (set) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],

  setSelectedChatType: (chatType) => set({ selectedChatType: chatType }),
  setSelectedChatData: (chat) => set({ selectedChatData: chat }),
  setSelectedChatMessages: (messages) =>
    set({ selectedChatMessages: messages }),

  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessages: [],
    }),
});
