"use client";

import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import { AuthContext } from "@/context/AuthContext";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { forgotPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const { authDispatch } = useContext(AuthContext);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setFormError(undefined);
    setIsSuccess(false);
    authDispatch({ type: ACTION_AUTH_START_LOADING });
    try {
      const result = await AmplifyAuthClient.forgotPassword(values.email);
      if (result.isPasswordReset) {
        setIsSuccess(true);
      } else {
        setFormError("Failed to send reset code. Please try again.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send reset code";
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Check your email</h3>
        <p className="text-gray-600 mb-4">
          We've sent a password reset code to your email address. Please check
          your inbox and use the code to reset your password.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            form.reset();
          }}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Send another code
        </button>
      </div>
    );
  }

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput name="email" label="Email" type="email" autoComplete="email" />
      <FormError message={formError} />
      <button type="submit" className="w-full mt-4 btn btn-primary">
        Send Reset Code
      </button>
    </FormWrapper>
  );
}
