import AuthPageLayout from "@/components/AuthPageLayout";
import { SIGN_UP } from "@/constants/authPageText";
import { METADATA_SIGN_UP } from "@/constants/metadata";
import { Metadata } from "next";
import SignUpForm from "./_components/SignUpForm";

export const metadata: Metadata = {
  title: METADATA_SIGN_UP.title,
  description: METADATA_SIGN_UP.description,
};

export default function SignUpPage() {
  return (
    <AuthPageLayout
      title={SIGN_UP.pageTitle}
      description={SIGN_UP.pageDescription}
    >
      <SignUpForm />
    </AuthPageLayout>
  );
}
