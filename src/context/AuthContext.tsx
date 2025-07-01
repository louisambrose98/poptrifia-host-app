"use client";

import { InitialStateAuth } from "@/state/AuthState";
import { AuthActionProps, AuthStateProps } from "@/types/auth";
import { createContext, Dispatch } from "react";

type Props = {
  authState: AuthStateProps;
  authDispatch: Dispatch<AuthActionProps>;
};

const initaialContext = {
  authState: InitialStateAuth,
  authDispatch: () => {},
};

export const AuthContext = createContext<Props>(initaialContext);
