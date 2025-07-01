"use client";

import {
  ACTION_AUTH_AUTHENTICATED,
  ACTION_AUTH_UNAUTHENTICATED,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import {
  AUTO_COMPLETE,
  FORM_LABELS,
  INPUT_TYPES,
  SIGN_IN,
} from "@/constants/authPageText";
import { AuthContext } from "@/context/AuthContext";
import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { signInSchema } from "@/schema/signIn";
import { InitialAuthUser } from "@/state/AuthState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function mapAmplifyUserToAuthUserState(
  user: any,
  attributes: Record<string, string>
): typeof InitialAuthUser {
  return {
    id: user?.userId || "",
    userType: "user", // or derive from attributes if available
    name: attributes?.name || "",
    email: attributes?.email || user?.username || "",
    username: user?.username || attributes?.preferred_username || "",
    country: attributes?.country || "",
    instagram: attributes?.instagram || "",
    twitter: attributes?.twitter || "",
    facebook: attributes?.facebook || "",
    tiktok: attributes?.tiktok || "",
    score: 0,
    capScore: 0,
    numPlayed: 0,
    streak: 0,
    coins: 0,
  };
}

export default function SignInForm() {
  const { authDispatch } = useContext(AuthContext);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: signInSchema,
    callback: async (validatedData) => {
      const result = await AmplifyAuthClient.signIn(
        validatedData.email,
        validatedData.password
      );

      if (result.isSignedIn && result.nextStep?.signInStep === "DONE") {
        // Fetch user info and attributes
        const user = await AmplifyAuthClient.getCurrentUser();
        const rawAttributes = await AmplifyAuthClient.fetchUserAttributes();
        const attributes: Record<string, string> = Object.entries(
          rawAttributes
        ).reduce((acc, [k, v]) => {
          acc[k] = v ?? "";
          return acc;
        }, {} as Record<string, string>);
        const mappedUser = mapAmplifyUserToAuthUserState(user, attributes);

        authDispatch({
          type: ACTION_AUTH_AUTHENTICATED,
          payload: { user: mappedUser },
        });

        return { success: true, user: mappedUser };
      } else {
        authDispatch({ type: ACTION_AUTH_UNAUTHENTICATED });
        throw new Error(SIGN_IN.errorMessages.additionalSteps);
      }
    },
    errorMessage: SIGN_IN.errorMessages.default,
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const result = await handleSubmit(values);

    if (result.success) {
      // Handle successful sign in (e.g., redirect)
      console.log("Sign in successful:", result.data);
    }
    // Error handling is done automatically by the form handler
  };

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
        autoComplete={AUTO_COMPLETE.currentPassword}
      />
      <FormError message={formError} />
      <button
        type="submit"
        className="w-full mt-4 btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : SIGN_IN.buttonText}
      </button>
    </FormWrapper>
  );
}
