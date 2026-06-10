import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
