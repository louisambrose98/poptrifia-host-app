import {
  autoSignIn,
  confirmResetPassword,
  confirmSignUp,
  fetchUserAttributes,
  getCurrentUser,
  resendSignUpCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updateUserAttributes,
} from "aws-amplify/auth";

// Centralized Amplify Auth client for all authentication actions
export const AmplifyAuthClient = {
  signIn: async (email: string, password: string) =>
    signIn({ username: email, password }),

  signUp: async (email: string, password: string) =>
    signUp({ username: email, password }),

  signOut: async () => signOut(),

  resendSignUpCode: async (email: string) =>
    resendSignUpCode({ username: email }),

  confirmSignUp: async (email: string, code: string) =>
    confirmSignUp({ username: email, confirmationCode: code }),

  autoSignIn: async () => autoSignIn(),

  fetchUserAttributes: async () => fetchUserAttributes(),

  getCurrentUser: async () => getCurrentUser(),

  updateUserAttributes: async (attributes: Record<string, string>) =>
    updateUserAttributes({ userAttributes: attributes }),

  forgotPassword: async (email: string) => resetPassword({ username: email }),

  confirmResetPassword: async (
    email: string,
    code: string,
    newPassword: string
  ) =>
    confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    }),
};
