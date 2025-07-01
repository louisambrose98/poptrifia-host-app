"use client";

import { FormCard } from "@/components/FormCard";
import { FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  FORM_LABELS,
  INPUT_TYPES,
  LINK_MESSAGES,
  LINK_TEXT,
  LOADING_TEXT,
  RESET_PASSWORD,
  SUCCESS_MESSAGES,
} from "@/constants/authPageText";
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGN_IN } from "@/constants/routes";
import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { resetPasswordSchema } from "@/schema/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ResetPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
    },
  });

  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: resetPasswordSchema,
    callback: async (validatedData) => {
      await AmplifyAuthClient.confirmResetPassword(
        validatedData.email,
        validatedData.code,
        validatedData.newPassword
      );
      return { success: true, email: validatedData.email };
    },
    errorMessage: RESET_PASSWORD.errorMessages.default,
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    const result = await handleSubmit(values);

    if (result.success) {
      console.log("Password reset successful:", result.data);
    }
  };

  if (isSuccess) {
    return (
      <FormCard
        title={RESET_PASSWORD.successMessages.title}
        description={RESET_PASSWORD.successMessages.description}
        bottomLink={{
          href: ROUTE_SIGN_IN,
          name: RESET_PASSWORD.secondaryButton,
        }}
      >
        <div className="text-center">
          <p className="text-muted-foreground">
            {SUCCESS_MESSAGES.passwordResetSuccess}
          </p>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard
      title={RESET_PASSWORD.pageTitle}
      description={RESET_PASSWORD.pageDescription}
      error={formError}
      bottomLink={{
        href: ROUTE_FORGOT_PASSWORD,
        name: LINK_TEXT.resendCode,
        message: LINK_MESSAGES.didntReceiveCode,
      }}
    >
      <FormWrapper form={form} onSubmit={onSubmit}>
        <div className="space-y-4">
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
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? LOADING_TEXT.resettingPassword
              : RESET_PASSWORD.buttonText}
          </button>
        </div>
      </FormWrapper>
    </FormCard>
  );
}
