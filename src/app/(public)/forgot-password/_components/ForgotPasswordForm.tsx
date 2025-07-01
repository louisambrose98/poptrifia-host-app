"use client";

import { FormCard } from "@/components/FormCard";
import { FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  FORGOT_PASSWORD,
  FORM_LABELS,
  INPUT_TYPES,
  LINK_MESSAGES,
  LINK_TEXT,
  LOADING_TEXT,
} from "@/constants/authPageText";
import { ROUTE_SIGN_IN } from "@/constants/routes";
import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { forgotPasswordSchema } from "@/schema/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: forgotPasswordSchema,
    callback: async (validatedData) => {
      await AmplifyAuthClient.forgotPassword(validatedData.email);
      return { success: true, email: validatedData.email };
    },
    errorMessage: FORGOT_PASSWORD.errorMessages.failedToSend,
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const handleResendCode = async () => {
    const email = form.getValues("email");
    if (!email) return;

    const result = await handleSubmit({ email });

    if (result.success) {
      console.log("Reset code sent successfully");
    }
  };

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    const result = await handleSubmit(values);

    if (result.success) {
      console.log("Forgot password request successful:", result.data);
    }
  };

  if (isSuccess) {
    return (
      <FormCard
        title={FORGOT_PASSWORD.successMessages.title}
        description={FORGOT_PASSWORD.successMessages.description}
      >
        <div className="text-center">
          <button
            onClick={handleResendCode}
            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : FORGOT_PASSWORD.secondaryButton}
          </button>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard
      title={FORGOT_PASSWORD.pageTitle}
      description={FORGOT_PASSWORD.pageDescription}
      error={formError}
      bottomLink={{
        href: ROUTE_SIGN_IN,
        name: LINK_TEXT.backToSignIn,
        message: LINK_MESSAGES.rememberPassword,
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
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? LOADING_TEXT.sendingResetCode
              : FORGOT_PASSWORD.buttonText}
          </button>
        </div>
      </FormWrapper>
    </FormCard>
  );
}
