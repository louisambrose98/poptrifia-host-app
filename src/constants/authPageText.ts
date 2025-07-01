// Shared form constants
export const FORM_LABELS = {
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  resetCode: "Reset Code",
  confirmationCode: "Confirmation Code",
  newPassword: "New Password",
} as const;

export const AUTO_COMPLETE = {
  email: "email",
  currentPassword: "current-password",
  newPassword: "new-password",
  oneTimeCode: "one-time-code",
} as const;

export const INPUT_TYPES = {
  email: "email",
  password: "password",
  text: "text",
} as const;

// Sign In Page
export const SIGN_IN = {
  pageTitle: "Sign In",
  pageDescription: "Sign in to your Poptrifia account.",
  buttonText: "Sign In",
  errorMessages: {
    default: "Failed to sign in",
    additionalSteps:
      "Additional authentication steps required. Please check your email or phone.",
  },
} as const;

// Sign Up Page
export const SIGN_UP = {
  pageTitle: "Sign Up",
  pageDescription: "Create a new Poptrifia account.",
  buttonText: "Sign Up",
  errorMessages: {
    default: "Failed to sign up",
  },
  successMessages: {
    title: "Check your email",
    description:
      "We've sent a confirmation code to your email address. Please check your inbox and confirm your account.",
  },
  secondaryButton: "Sign up with a different email",
} as const;

// Forgot Password Page
export const FORGOT_PASSWORD = {
  pageTitle: "Forgot Password",
  pageDescription: "Enter your email to reset your password.",
  buttonText: "Send Reset Code",
  errorMessages: {
    default: "Failed to send reset code",
    failedToSend: "Failed to send reset code. Please try again.",
  },
  successMessages: {
    title: "Check your email",
    description:
      "We've sent a password reset code to your email address. Please check your inbox and use the code to reset your password.",
  },
  secondaryButton: "Send another code",
} as const;

// Reset Password Page
export const RESET_PASSWORD = {
  pageTitle: "Reset Password",
  pageDescription: "Set your new password below.",
  buttonText: "Reset Password",
  errorMessages: {
    default: "Failed to reset password",
  },
  successMessages: {
    title: "Password Reset Successful",
    description:
      "Your password has been successfully reset. You can now sign in with your new password.",
  },
  secondaryButton: "Go to Sign In",
} as const;

// Confirm Email Page
export const CONFIRM_EMAIL = {
  pageTitle: "Confirm Email",
  pageDescription: "Please check your email for a confirmation code.",
  buttonText: "Confirm Email",
  errorMessages: {
    default: "Failed to confirm email",
    failedToConfirm: "Failed to confirm email. Please try again.",
  },
  successMessages: {
    title: "Email Confirmed Successfully",
    description:
      "Your email has been confirmed. You can now sign in to your account.",
  },
  secondaryButton: "Go to Sign In",
} as const;
