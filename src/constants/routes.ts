export const ROUTE_SIGN_IN = "/sign-in";
export const ROUTE_SIGN_UP = "/sign-up";
export const ROUTE_FORGOT_PASSWORD = "/forgot-password";
export const ROUTE_RESET_PASSWORD = "/reset-password";
export const ROUTE_CONFIRM_EMAIL = "/confirm-email";

// Private routes
export const ROUTE_DASHBOARD = "/";
export const ROUTE_QUESTIONS = "/question";
export const ROUTE_QUIZ = "/quiz";
export const ROUTE_STATUS = "/status";
export const ROUTE_SETTINGS = "/settings";
export const ROUTE_SUPPORT = "/support";

export const NAV_ITEMS = [
  { href: ROUTE_DASHBOARD, label: "Dashboard" },
  { href: ROUTE_QUESTIONS, label: "Questions" },
  { href: ROUTE_QUIZ, label: "Quiz" },
  { href: ROUTE_STATUS, label: "Status" },
];

export const RIGHT_NAV_ITEMS = [
  { href: ROUTE_SETTINGS, label: "Settings" },
  { href: ROUTE_SUPPORT, label: "Support" },
];
