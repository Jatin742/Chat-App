import { StateCreator } from "zustand";

export interface User {
  id: string;
  email: string;
}
export interface AuthSlice {
  userInfo?: User;
  setUserInfo: (userInfo: User | undefined) => void;
}


export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});