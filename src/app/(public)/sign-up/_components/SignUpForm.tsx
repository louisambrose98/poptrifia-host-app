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
  SIGN_UP,
} from "@/constants/authPageText";
import { ROUTE_SIGN_IN } from "@/constants/routes";
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
          } catch (autoSignInError: unknown) {
            // TODO: Add better error typing/handling if needed
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
    onSuccess: () => {
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
      <FormCard
        title={SIGN_UP.successMessages.title}
        description={SIGN_UP.successMessages.description}
      >
        <div className="text-center">
          <button
            onClick={() => {
              setIsSuccess(false);
              form.reset();
            }}
            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {SIGN_UP.secondaryButton}
          </button>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard
      title={SIGN_UP.pageTitle}
      description={SIGN_UP.pageDescription}
      error={formError}
      bottomLink={{
        href: ROUTE_SIGN_IN,
        name: LINK_TEXT.signIn,
        message: LINK_MESSAGES.alreadyHaveAccount,
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
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? LOADING_TEXT.creatingAccount : SIGN_UP.buttonText}
          </button>
        </div>
      </FormWrapper>
    </FormCard>
  );
}
