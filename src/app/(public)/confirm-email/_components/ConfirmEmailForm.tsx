"use client";

import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import { AuthContext } from "@/context/AuthContext";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { confirmEmailSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ConfirmEmailForm() {
  const { authDispatch } = useContext(AuthContext);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof confirmEmailSchema>>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: { email: "", code: "" },
  });

  const onSubmit = async (values: z.infer<typeof confirmEmailSchema>) => {
    setFormError(undefined);
    setIsSuccess(false);
    authDispatch({ type: ACTION_AUTH_START_LOADING });
    try {
      const result = await AmplifyAuthClient.confirmSignUp(
        values.email,
        values.code
      );
      if (result.isSignUpComplete) {
        setIsSuccess(true);
        // If auto sign-in is enabled, handle it
        if (result.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
          try {
            await AmplifyAuthClient.autoSignIn();
          } catch (autoSignInError: unknown) {
            console.warn("Auto sign-in failed:", autoSignInError);
          }
        }
      } else {
        setFormError("Failed to confirm email. Please try again.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to confirm email";
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Email Confirmed Successfully
        </h3>
        <p className="text-gray-600 mb-4">
          Your email has been confirmed. You can now sign in to your account.
        </p>
        <a
          href="/sign-in"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Go to Sign In
        </a>
      </div>
    );
  }

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput name="email" label="Email" type="email" autoComplete="email" />
      <FormInput
        name="code"
        label="Confirmation Code"
        type="text"
        autoComplete="one-time-code"
      />
      <FormError message={formError} />
      <button type="submit" className="w-full mt-4 btn btn-primary">
        Confirm Email
      </button>
    </FormWrapper>
  );
}
