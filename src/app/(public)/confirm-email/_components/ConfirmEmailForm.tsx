"use client";

import { FormCard } from "@/components/FormCard";
import { FormInput } from "@/components/FormInput";
import { FormWrapper } from "@/components/FormWrapper";
import {
  AUTO_COMPLETE,
  CONFIRM_EMAIL,
  FORM_LABELS,
  INPUT_TYPES,
  LINK_TEXT,
  LOADING_TEXT,
  SUCCESS_MESSAGES,
} from "@/constants/authPageText";
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP } from "@/constants/routes";
import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { confirmEmailSchema } from "@/schema/confirmEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ConfirmEmailForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof confirmEmailSchema>>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: { email: "", code: "" },
  });

  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: confirmEmailSchema,
    callback: async (validatedData) => {
      await AmplifyAuthClient.confirmSignUp(
        validatedData.email,
        validatedData.code
      );
      return { success: true, email: validatedData.email };
    },
    errorMessage: CONFIRM_EMAIL.errorMessages.failedToConfirm,
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const handleResendCode = async () => {
    const email = form.getValues("email");
    if (!email) return;

    const result = await handleSubmit({ email, code: "" });

    if (result.success) {
      console.log("Confirmation code sent successfully");
    }
  };

  const onSubmit = async (values: z.infer<typeof confirmEmailSchema>) => {
    const result = await handleSubmit(values);

    if (result.success) {
      console.log("Email confirmation successful:", result.data);
    }
  };

  if (isSuccess) {
    return (
      <FormCard
        title={CONFIRM_EMAIL.successMessages.title}
        description={CONFIRM_EMAIL.successMessages.description}
        bottomLink={{
          href: ROUTE_SIGN_IN,
          name: CONFIRM_EMAIL.secondaryButton,
        }}
      >
        <div className="text-center">
          <p className="text-muted-foreground">
            {SUCCESS_MESSAGES.emailConfirmedSuccess}
          </p>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard
      title={CONFIRM_EMAIL.pageTitle}
      description={CONFIRM_EMAIL.pageDescription}
      error={formError}
      topLink={{
        href: ROUTE_SIGN_UP,
        name: LINK_TEXT.signUpWithDifferentEmail,
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
            label={FORM_LABELS.confirmationCode}
            type={INPUT_TYPES.text}
            autoComplete={AUTO_COMPLETE.oneTimeCode}
          />
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? LOADING_TEXT.confirmingEmail
              : CONFIRM_EMAIL.buttonText}
          </button>
          <button
            type="button"
            onClick={handleResendCode}
            className="w-full text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? LOADING_TEXT.sending : LINK_TEXT.resendCodeButton}
          </button>
        </div>
      </FormWrapper>
    </FormCard>
  );
}
