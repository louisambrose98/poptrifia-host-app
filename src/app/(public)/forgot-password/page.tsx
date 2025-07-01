import AuthPageLayout from "@/components/AuthPageLayout";
import { FORGOT_PASSWORD } from "@/constants/authPageText";
import { METADATA_FORGOT_PASSWORD } from "@/constants/metadata";
import { Metadata } from "next";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: METADATA_FORGOT_PASSWORD.title,
  description: METADATA_FORGOT_PASSWORD.description,
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageLayout
      title={FORGOT_PASSWORD.pageTitle}
      description={FORGOT_PASSWORD.pageDescription}
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
