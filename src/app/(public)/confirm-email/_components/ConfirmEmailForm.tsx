"use client";

import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  CONFIRM_EMAIL,
  FORM_LABELS,
  INPUT_TYPES,
} from "@/constants/authPageText";
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
      await AmplifyAuthClient.confirmSignUp(values.email, values.code);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : CONFIRM_EMAIL.errorMessages.failedToConfirm;
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
      await AmplifyAuthClient.resendSignUpCode(email);
      // Show success message or toast
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : CONFIRM_EMAIL.errorMessages.failedToConfirm;
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
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
      <button type="submit" className="w-full mt-4 btn btn-primary">
        {CONFIRM_EMAIL.buttonText}
      </button>
      <button
        type="button"
        onClick={handleResendCode}
        className="w-full mt-2 text-blue-600 hover:text-blue-800 underline"
      >
        Resend Code
      </button>
    </FormWrapper>
  );
}
