"use client";

import {
  ACTION_AUTH_AUTHENTICATED,
  ACTION_AUTH_START_LOADING,
  ACTION_AUTH_STOP_LOADING,
  ACTION_AUTH_UNAUTHENTICATED,
} from "@/actions/AuthActions";
import { FormError, FormInput, FormWrapper } from "@/components/forms";
import { AuthContext } from "@/context/AuthContext";
import { AmplifyAuthClient } from "@/lib/amplifyAuthClient";
import { signInSchema } from "@/schema/auth";
import { InitialAuthUser } from "@/state/AuthState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
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
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setFormError(undefined);
    authDispatch({ type: ACTION_AUTH_START_LOADING });
    try {
      const result = await AmplifyAuthClient.signIn(
        values.email,
        values.password
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
      } else {
        setFormError(
          "Additional authentication steps required. Please check your email or phone."
        );
        authDispatch({ type: ACTION_AUTH_UNAUTHENTICATED });
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign in";
      setFormError(errorMessage);
      authDispatch({ type: ACTION_AUTH_UNAUTHENTICATED });
    } finally {
      authDispatch({ type: ACTION_AUTH_STOP_LOADING });
    }
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput name="email" label="Email" type="email" autoComplete="email" />
      <FormInput
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <FormError message={formError} />
      <button type="submit" className="w-full mt-4 btn btn-primary">
        Sign In
      </button>
    </FormWrapper>
  );
}
