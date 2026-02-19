import { IUser } from "@/interface/IUser";
import { StateCreator } from "zustand";
export interface AuthSlice {
  userInfo?: IUser;
  setUserInfo: (userInfo: IUser | undefined) => void;
}


export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});