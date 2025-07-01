import AuthPageLayout from "@/components/AuthPageLayout";
import { SIGN_IN } from "@/constants/authPageText";
import { METADATA_SIGN_IN } from "@/constants/metadata";
import { Metadata } from "next";
import SignInForm from "./_components/SignInForm";

export const metadata: Metadata = {
  title: METADATA_SIGN_IN.title,
  description: METADATA_SIGN_IN.description,
};

export default function SignInPage() {
  return (
    <AuthPageLayout
      title={SIGN_IN.pageTitle}
      description={SIGN_IN.pageDescription}
    >
      <SignInForm />
    </AuthPageLayout>
  );
}
