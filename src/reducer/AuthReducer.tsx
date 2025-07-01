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
import { AuthStateProps } from "@/context/AuthContext";
import { isValidString } from "@/lib/guards";
import { getCleanUserData } from "@/lib/objects";
import { InitialStateAuth } from "@/state/AuthState";
import { AuthActionProps } from "@/types/auth";

/**
 *
 * tbd
 *
 */

export const authReducer = (
  state: AuthStateProps,
  { type, payload }: AuthActionProps
): AuthStateProps => {
  switch (type) {
    case ACTION_AUTH_UNAUTHENTICATED:
      return { ...InitialStateAuth, isAuthenticated: false };

    case ACTION_AUTH_START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ACTION_AUTH_STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case ACTION_AUTH_SET_LOADING_EMAIL:
      if (!payload?.user || !isValidString(payload?.user.email)) {
        return state;
      }

      return {
        ...state,
        isLoading: true,
        user: { ...state.user, email: payload?.user.email },
      };

    case ACTION_AUTH_SET_USER:
      if (!payload?.user) {
        return { ...state, isLoading: false };
      }

      return {
        ...state,
        isLoading: false,
        user: { ...state.user, ...payload?.user },
      };

    case ACTION_AUTH_AUTHENTICATED:
      if (!payload?.user) {
        return { ...InitialStateAuth, isAuthenticated: false };
      }

      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: { ...state.user, ...payload?.user },
      };

    case ACTION_AUTH_UPDATE_USER:
      const userPayload = payload?.user;

      if (!userPayload) {
        return { ...state, isLoading: false };
      }

      return {
        ...state,
        isLoading: false,
        user: getCleanUserData(userPayload, state.user),
        newEmail: null,
      };

    case ACTION_AUTH_CHANGE_EMAIL:
      if (!isValidString(payload?.newEmail)) {
        return { ...state, isLoading: false };
      }

      return {
        ...state,
        isLoading: true,
        newEmail: payload?.newEmail,
      };

    case ACTION_AUTH_SIGN_OUT:
      return { ...InitialStateAuth, isAuthenticated: false };

    default:
      return state;
  }
};
