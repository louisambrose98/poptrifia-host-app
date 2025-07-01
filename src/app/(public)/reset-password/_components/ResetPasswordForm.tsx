"use client";

import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  FORM_LABELS,
  INPUT_TYPES,
  RESET_PASSWORD,
} from "@/constants/authPageText";
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
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
    },
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
        err instanceof Error
          ? err.message
          : RESET_PASSWORD.errorMessages.default;
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {RESET_PASSWORD.successMessages.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {RESET_PASSWORD.successMessages.description}
        </p>
        <a
          href="/sign-in"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {RESET_PASSWORD.secondaryButton}
        </a>
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
      <FormInput
        name="code"
        label={FORM_LABELS.resetCode}
        type={INPUT_TYPES.text}
        autoComplete={AUTO_COMPLETE.oneTimeCode}
      />
      <FormInput
        name="newPassword"
        label={FORM_LABELS.newPassword}
        type={INPUT_TYPES.password}
        autoComplete={AUTO_COMPLETE.newPassword}
      />
      <FormError message={formError} />
      <button type="submit" className="w-full mt-4 btn btn-primary">
        {RESET_PASSWORD.buttonText}
      </button>
    </FormWrapper>
  );
}
