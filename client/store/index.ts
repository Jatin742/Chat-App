import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/auth-slice";
import { ChatSlice, createChatSlice } from "./slices/chat-slice";

type Store = AuthSlice & ChatSlice;

export const useAppStore = create<Store>()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}));