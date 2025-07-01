import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { forgotPasswordSchema, signInSchema, signUpSchema } from "@/schema";
import { z } from "zod";
import { AmplifyAuthClient } from "./amplifyAuthClient";
import { formHandler } from "./formHandler";

// Example 1: Basic usage with direct formHandler
export const basicSignInExample = async (email: string, password: string) => {
  const result = await formHandler({
    data: { email, password },
    schema: signInSchema,
    callback: async (validatedData) => {
      return await AmplifyAuthClient.signIn(
        validatedData.email,
        validatedData.password
      );
    },
    errorMessage: "Failed to sign in",
  });

  if (result.success) {
    console.log("Sign in successful:", result.data);
  } else {
    console.error("Sign in failed:", result.error);
  }

  return result;
};

// Example 2: Usage with custom loading states
export const signInWithCustomLoading = async (
  email: string,
  password: string,
  dispatch: any
) => {
  const result = await formHandler({
    data: { email, password },
    schema: signInSchema,
    dispatch,
    startPayload: { type: "CUSTOM_START_LOADING" },
    endPayload: { type: "CUSTOM_STOP_LOADING" },
    callback: async (validatedData) => {
      return await AmplifyAuthClient.signIn(
        validatedData.email,
        validatedData.password
      );
    },
    onSuccess: (result) => {
      console.log("Success callback:", result);
    },
    onError: (error) => {
      console.error("Error callback:", error);
    },
  });

  return result;
};

// Example 3: Complex form with multiple validations
const complexFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const complexFormExample = async (formData: any) => {
  const result = await formHandler({
    data: formData,
    schema: complexFormSchema,
    callback: async (validatedData) => {
      // Multiple async operations
      const signUpResult = await AmplifyAuthClient.signUp(
        validatedData.email,
        validatedData.password
      );

      // Additional processing
      const userAttributes = await AmplifyAuthClient.fetchUserAttributes();

      return {
        signUp: signUpResult,
        attributes: userAttributes,
      };
    },
    errorMessage: "Failed to process form",
  });

  return result;
};

// Example 4: React component usage with useAuthFormHandler
export const ReactComponentExample = () => {
  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: signUpSchema,
    callback: async (validatedData) => {
      const result = await AmplifyAuthClient.signUp(
        validatedData.email,
        validatedData.password
      );

      if (result.isSignUpComplete) {
        return { success: true, userId: result.userId };
      } else {
        throw new Error("Sign up incomplete");
      }
    },
    onSuccess: (result) => {
      console.log("Sign up successful:", result);
      // Handle navigation or other success actions
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      // Handle error-specific actions
    },
  });

  const onSubmit = async (formData: any) => {
    const result = await handleSubmit(formData);

    if (result.success) {
      // Additional success handling
      console.log("Form submitted successfully:", result.data);
    }
  };

  return {
    onSubmit,
    formError,
    isLoading,
  };
};

// Example 5: Batch operations with multiple form handlers
export const batchOperationsExample = async (
  operations: Array<{ type: string; data: any }>
) => {
  const results = [];

  for (const operation of operations) {
    let schema;
    let callback;

    switch (operation.type) {
      case "signIn":
        schema = signInSchema;
        callback = async (data: any) =>
          AmplifyAuthClient.signIn(data.email, data.password);
        break;
      case "signUp":
        schema = signUpSchema;
        callback = async (data: any) =>
          AmplifyAuthClient.signUp(data.email, data.password);
        break;
      case "forgotPassword":
        schema = forgotPasswordSchema;
        callback = async (data: any) =>
          AmplifyAuthClient.forgotPassword(data.email);
        break;
      default:
        throw new Error(`Unknown operation type: ${operation.type}`);
    }

    const result = await formHandler({
      data: operation.data,
      schema,
      callback,
      errorMessage: `Failed to ${operation.type}`,
    });

    results.push({ type: operation.type, result });
  }

  return results;
};

// Example 6: Form handler with retry logic
export const formHandlerWithRetry = async <TData, TResult>(
  props: any,
  maxRetries: number = 3
) => {
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await formHandler(props);

    if (result.success) {
      return result;
    }

    lastError = result.error;

    // Don't retry on validation errors
    if (
      result.error.includes("validation") ||
      result.error.includes("Invalid")
    ) {
      break;
    }

    // Wait before retrying (exponential backoff)
    if (attempt < maxRetries) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  return { success: false, error: lastError || "Max retries exceeded" };
};
