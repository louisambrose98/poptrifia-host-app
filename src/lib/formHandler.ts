import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { AuthActionProps } from "@/types/auth";
import { Dispatch } from "react";
import { z } from "zod";

// Error mapping for common auth errors
const AUTH_ERROR_MAP: { [key: string]: string } = {
  UserNotFoundException:
    "User not found. Please check your email and try again.",
  NotAuthorizedException: "Invalid email or password. Please try again.",
  UserNotConfirmedException:
    "Please confirm your email address before signing in.",
  CodeMismatchException:
    "Invalid confirmation code. Please check your email and try again.",
  ExpiredCodeException:
    "Confirmation code has expired. Please request a new one.",
  LimitExceededException: "Too many attempts. Please try again later.",
  InvalidPasswordException:
    "Password does not meet requirements. Please choose a stronger password.",
  UsernameExistsException: "An account with this email already exists.",
  InvalidParameterException:
    "Invalid input. Please check your information and try again.",
  TooManyRequestsException: "Too many requests. Please try again later.",
  NetworkError: "Network error. Please check your connection and try again.",
};

// Default error messages
const DEFAULT_ERROR_MESSAGES = {
  validation: "Please check your input and try again.",
  network: "Network error. Please check your connection and try again.",
  unknown: "An unexpected error occurred. Please try again.",
  loading: "Please wait while we process your request.",
};

export type FormHandlerProps<TData, TResult> = {
  // Form data and validation
  data: TData;
  schema: z.ZodSchema<TData>;

  // Loading state management
  isLoading?: boolean;
  dispatch?: Dispatch<AuthActionProps>;

  // Action payloads
  startPayload?: AuthActionProps;
  endPayload?: AuthActionProps;

  // Callback function
  callback: (validatedData: TData) => Promise<TResult>;

  // Error handling
  errorMessage?: string;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
};

export type FormHandlerResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: string };

/**
 * Comprehensive form submit handler with Zod validation, loading state, and error handling
 */
export const formHandler = async <TData, TResult>(
  props: FormHandlerProps<TData, TResult>
): Promise<FormHandlerResult<TResult>> => {
  const {
    data,
    schema,
    isLoading = false,
    dispatch,
    startPayload,
    endPayload,
    callback,
    errorMessage,
    onSuccess,
    onError,
  } = props;

  // Prevent multiple calls while loading
  if (isLoading) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGES.loading,
    };
  }

  // Start loading state
  if (dispatch) {
    dispatch(startPayload || { type: ACTION_AUTH_START_LOADING });
  }

  try {
    // Validate data with Zod schema
    const validatedData = schema.parse(data);

    // Execute callback with validated data
    const result = await callback(validatedData);

    // Handle success
    if (onSuccess) {
      onSuccess(result);
    }

    return { success: true, data: result };
  } catch (error: any) {
    let errorMessageToUse = DEFAULT_ERROR_MESSAGES.unknown;

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      errorMessageToUse =
        firstError?.message || DEFAULT_ERROR_MESSAGES.validation;
    }
    // Handle Amplify auth errors
    else if (error?.name && AUTH_ERROR_MAP[error.name]) {
      errorMessageToUse = AUTH_ERROR_MAP[error.name];
    }
    // Handle network errors
    else if (
      error?.message?.includes("Network") ||
      error?.code === "NETWORK_ERROR"
    ) {
      errorMessageToUse = DEFAULT_ERROR_MESSAGES.network;
    }
    // Handle custom error messages
    else if (error?.message) {
      errorMessageToUse = error.message;
    }
    // Use provided error message as fallback
    else if (errorMessage) {
      errorMessageToUse = errorMessage;
    }

    // Handle error callback
    if (onError) {
      onError(errorMessageToUse);
    }

    // Log error for debugging (in development)
    if (process.env.NODE_ENV === "development") {
      console.error("Form Handler Error:", {
        error,
        errorName: error?.name,
        errorMessage: error?.message,
        validatedError: errorMessageToUse,
      });
    }

    return { success: false, error: errorMessageToUse };
  } finally {
    // Stop loading state
    if (dispatch) {
      dispatch(endPayload || { type: ACTION_AUTH_STOP_LOADING });
    }
  }
};

/**
 * Simplified form handler for common auth operations
 */
export const authFormHandler = async <TData, TResult>(
  props: Omit<FormHandlerProps<TData, TResult>, "schema"> & {
    schema: z.ZodSchema<TData>;
  }
): Promise<FormHandlerResult<TResult>> => {
  return formHandler(props);
};

/**
 * Hook-style form handler for React components
 */
export const useFormHandler = <TData, TResult>() => {
  return {
    handleSubmit: async (
      props: Omit<FormHandlerProps<TData, TResult>, "data"> & {
        data: TData;
      }
    ): Promise<FormHandlerResult<TResult>> => {
      return formHandler(props);
    },
  };
};
