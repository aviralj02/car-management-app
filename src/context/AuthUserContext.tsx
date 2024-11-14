"use client";

import useFirebaseAuth from "@/firebase/useFirebaseAuth";
import { createContext, ReactNode, useContext } from "react";

const AuthUserContext = createContext<AuthUser>({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
