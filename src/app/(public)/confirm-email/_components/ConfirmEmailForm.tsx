"use client";

import { FormError, FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  CONFIRM_EMAIL,
  FORM_LABELS,
  INPUT_TYPES,
} from "@/constants/authPageText";
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
    onSuccess: (result) => {
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
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {CONFIRM_EMAIL.successMessages.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {CONFIRM_EMAIL.successMessages.description}
        </p>
        <a
          href="/sign-in"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {CONFIRM_EMAIL.secondaryButton}
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
        label={FORM_LABELS.confirmationCode}
        type={INPUT_TYPES.text}
        autoComplete={AUTO_COMPLETE.oneTimeCode}
      />
      <FormError message={formError} />
      <button
        type="submit"
        className="w-full mt-4 btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Confirming Email..." : CONFIRM_EMAIL.buttonText}
      </button>
      <button
        type="button"
        onClick={handleResendCode}
        className="w-full mt-2 text-blue-600 hover:text-blue-800 underline"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Resend Code"}
      </button>
    </FormWrapper>
  );
}
