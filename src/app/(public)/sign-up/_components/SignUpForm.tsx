"use client";

import {
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import { AuthContext } from "@/context/AuthContext";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { signUpSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUpForm() {
  const { authDispatch } = useContext(AuthContext);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setFormError(undefined);
    setIsSuccess(false);
    authDispatch({ type: ACTION_AUTH_START_LOADING });
    try {
      const result = await AmplifyAuthClient.signUp(
        values.email,
        values.password
      );
      if (result.isSignUpComplete) {
        setIsSuccess(true);
        // If auto sign-in is enabled, handle it
        if (result.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
          try {
            await AmplifyAuthClient.autoSignIn();
          } catch (autoSignInError: any) {
            console.warn("Auto sign-in failed:", autoSignInError);
          }
        }
      } else {
        // User needs to confirm email
        setIsSuccess(true);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign up";
      setFormError(errorMessage);
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Check your email</h3>
        <p className="text-gray-600 mb-4">
          We've sent a confirmation code to your email address. Please check
          your inbox and confirm your account.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            form.reset();
          }}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Sign up with a different email
        </button>
      </div>
    );
  }

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput name="email" label="Email" type="email" autoComplete="email" />
      <FormInput
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
      />
      <FormInput
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
      />
      <FormError message={formError} />
      <button type="submit" className="w-full mt-4 btn btn-primary">
        Sign Up
      </button>
    </FormWrapper>
  );
}
