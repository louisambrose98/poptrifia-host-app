import {
  ACTION_AUTH_AUTHENTICATED,
  ACTION_AUTH_CHANGE_EMAIL,
  ACTION_AUTH_SET_LOADING_EMAIL,
  ACTION_AUTH_SET_USER,
  ACTION_AUTH_SIGN_OUT,
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
  ACTION_AUTH_UNAUTHENTICATED,
  ACTION_AUTH_UPDATE_USER,
} from "@/actions/AuthActions";
import { AUTH_USER } from "@/constants/auth";

export type PlayerScores = {
  id: string;
  date: string;
  score: number;
};

export type AuthUserStateProps = {
  id: string;
  userType: string;
  [AUTH_USER.name]: string;
  [AUTH_USER.email]: string;
  [AUTH_USER.username]: string;
  [AUTH_USER.country]: string;
  [AUTH_USER.instgram]: string;
  [AUTH_USER.twitter]: string;
  [AUTH_USER.facebook]: string;
  [AUTH_USER.tiktok]: string;
  score: number;
  capScore: number;
  numPlayed: number;
  streak: number;
  coins: number;
};

export type NonSensitiveUserProps = Omit<
  AuthUserStateProps,
  "id" | "email" | "userType"
>;

export type AuthStateProps = {
  isLoading: boolean;
  isAuthenticated: boolean | null;
  user: AuthUserStateProps;
  newEmail: string | null;
};

type authActions =
  | typeof ACTION_AUTH_START_LOADING
  | typeof ACTION_AUTH_STOP_LOADING
  | typeof ACTION_AUTH_AUTHENTICATED
  | typeof ACTION_AUTH_SET_USER
  | typeof ACTION_AUTH_UNAUTHENTICATED
  | typeof ACTION_AUTH_SET_LOADING_EMAIL
  | typeof ACTION_AUTH_UPDATE_USER
  | typeof ACTION_AUTH_CHANGE_EMAIL
  | typeof ACTION_AUTH_SIGN_OUT;

export type AuthActionProps = {
  type: authActions;
  payload?: {
    user?: Partial<AuthUserStateProps>;
    newEmail?: string | null;
  };
};
