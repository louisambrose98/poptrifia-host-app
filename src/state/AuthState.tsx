"use client";

import { EMPTY, ZERO } from "@/constants/general";
import { AuthStateProps, AuthUserStateProps } from "@/types/auth";

export const InitialAuthUser: AuthUserStateProps = {
  id: EMPTY,
  userType: EMPTY,
  name: EMPTY,
  username: EMPTY,
  country: EMPTY,
  coins: ZERO,
  email: EMPTY,
  instagram: EMPTY,
  twitter: EMPTY,
  facebook: EMPTY,
  tiktok: EMPTY,
  score: ZERO,
  capScore: ZERO,
  numPlayed: ZERO,
  streak: ZERO,
};

export const InitialStateAuth: AuthStateProps = {
  isLoading: false,
  isAuthenticated: null,
  user: InitialAuthUser,
  newEmail: null,
};
