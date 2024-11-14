"use client";

import { useState, useEffect } from "react";
import { auth } from "./config";

import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

const formatAuthUser = (user: User) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth(): AuthUser {
  const [authUser, setAuthUser] = useState<User>({
    uid: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser({
      uid: "",
      email: "",
    });
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email: string, password: string) =>
    _signInWithEmailAndPassword(auth, email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    _createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => _signOut(auth).then(clear);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setLoading(false);
      return;
    }
    setLoading(true);

    let formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);
    setLoading(false);
  };

  const onAuthStateChanged = (cb: any) => {
    return _onAuthStateChanged(auth, cb);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
