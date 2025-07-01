"use client";

import { FormError, FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  FORM_LABELS,
  INPUT_TYPES,
  SIGN_UP,
} from "@/constants/authPageText";
import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { signUpSchema } from "@/schema/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUpForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: signUpSchema,
    callback: async (validatedData) => {
      const result = await AmplifyAuthClient.signUp(
        validatedData.email,
        validatedData.password
      );

      if (result.isSignUpComplete) {
        // If auto sign-in is enabled, handle it
        if (result.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
          try {
            await AmplifyAuthClient.autoSignIn();
          } catch (autoSignInError: any) {
            console.warn("Auto sign-in failed:", autoSignInError);
          }
        }
        return { success: true, userId: result.userId };
      } else {
        // User needs to confirm email
        return {
          success: true,
          needsConfirmation: true,
          userId: result.userId,
        };
      }
    },
    errorMessage: SIGN_UP.errorMessages.default,
    onSuccess: (result) => {
      setIsSuccess(true);
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const result = await handleSubmit(values);

    if (result.success) {
      console.log("Sign up successful:", result.data);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {SIGN_UP.successMessages.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {SIGN_UP.successMessages.description}
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            form.reset();
          }}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {SIGN_UP.secondaryButton}
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
      <FormInput
        name="password"
        label={FORM_LABELS.password}
        type={INPUT_TYPES.password}
        autoComplete={AUTO_COMPLETE.newPassword}
      />
      <FormInput
        name="confirmPassword"
        label={FORM_LABELS.confirmPassword}
        type={INPUT_TYPES.password}
        autoComplete={AUTO_COMPLETE.newPassword}
      />
      <FormError message={formError} />
      <button
        type="submit"
        className="w-full mt-4 btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : SIGN_UP.buttonText}
      </button>
    </FormWrapper>
  );
}
