"use client";

import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  FORGOT_PASSWORD,
  FORM_LABELS,
  INPUT_TYPES,
} from "@/constants/authPageText";
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
      await AmplifyAuthClient.forgotPassword(values.email);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : FORGOT_PASSWORD.errorMessages.failedToSend;
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  const handleResendCode = async () => {
    const email = form.getValues("email");
    if (!email) return;

    setFormError(undefined);
    authDispatch({ type: ACTION_AUTH_START_LOADING });
    try {
      await AmplifyAuthClient.forgotPassword(email);
      // Show success message or toast
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : FORGOT_PASSWORD.errorMessages.failedToSend;
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {FORGOT_PASSWORD.successMessages.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {FORGOT_PASSWORD.successMessages.description}
        </p>
        <button
          onClick={handleResendCode}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {FORGOT_PASSWORD.secondaryButton}
        </button>
      </div>
    );
  }

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput
        name="email"
        label={FORM_LABELS.email}
        type={INPUT_TYPES.email}
        autoComplete={AUTO_COMPLETE.email}
      />
      <FormError message={formError} />
      <button type="submit" className="w-full mt-4 btn btn-primary">
        {FORGOT_PASSWORD.buttonText}
      </button>
    </FormWrapper>
  );
}
