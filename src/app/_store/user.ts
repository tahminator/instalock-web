import { User } from "@prisma/client";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>()((set) => {
  return {
    user: null,
    setUser: (user: User | null) => set(() => ({ user })),
  };
});
