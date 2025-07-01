"use client";

import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import { AuthContext } from "@/context/AuthContext";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { resetPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ResetPasswordForm() {
  const { authDispatch } = useContext(AuthContext);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", code: "", newPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setFormError(undefined);
    setIsSuccess(false);
    authDispatch({ type: ACTION_AUTH_START_LOADING });
    try {
      await AmplifyAuthClient.confirmResetPassword(
        values.email,
        values.code,
        values.newPassword
      );
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to reset password";
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Password Reset Successful
        </h3>
        <p className="text-gray-600 mb-4">
          Your password has been successfully reset. You can now sign in with
          your new password.
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
        label="Reset Code"
        type="text"
        autoComplete="one-time-code"
      />
      <FormInput
        name="newPassword"
        label="New Password"
        type="password"
        autoComplete="new-password"
      />
      <FormError message={formError} />
      <button type="submit" className="w-full mt-4 btn btn-primary">
        Reset Password
      </button>
    </FormWrapper>
  );
}
