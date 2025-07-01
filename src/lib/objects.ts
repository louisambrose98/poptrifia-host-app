import { InitialAuthUser } from "@/state/AuthState";
import { AuthUserStateProps } from "@/types/auth";

export const getCleanUserData = (
  user: any,
  state: AuthUserStateProps = InitialAuthUser
): AuthUserStateProps => {
  return {
    ...user,
    ...state,
  };
};
