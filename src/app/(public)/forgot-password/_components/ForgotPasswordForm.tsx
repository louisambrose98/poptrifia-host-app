"use client";

import { FormError, FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  FORGOT_PASSWORD,
  FORM_LABELS,
  INPUT_TYPES,
} from "@/constants/authPageText";
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
    onSuccess: (result) => {
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
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : FORGOT_PASSWORD.secondaryButton}
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
      <button
        type="submit"
        className="w-full mt-4 btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Sending Reset Code..." : FORGOT_PASSWORD.buttonText}
      </button>
    </FormWrapper>
  );
}
