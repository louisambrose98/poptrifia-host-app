"use client";

import { AuthContext } from "@/context/AuthContext";
import { authReducer } from "@/reducer/AuthReducer";
import { InitialStateAuth } from "@/state/AuthState";
import { ReactNode, useEffect, useReducer } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, authDispatch] = useReducer(authReducer, InitialStateAuth);

  useEffect(() => {
    // on page load
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
