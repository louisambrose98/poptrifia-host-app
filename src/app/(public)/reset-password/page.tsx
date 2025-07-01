import AuthPageLayout from "@/components/AuthPageLayout";
import { RESET_PASSWORD } from "@/constants/authPageText";
import { METADATA_RESET_PASSWORD } from "@/constants/metadata";
import { Metadata } from "next";
import ResetPasswordForm from "./_components/ResetPasswordForm";

export const metadata: Metadata = {
  title: METADATA_RESET_PASSWORD.title,
  description: METADATA_RESET_PASSWORD.description,
};

export default function ResetPassword() {
  return (
    <AuthPageLayout
      title={RESET_PASSWORD.pageTitle}
      description={RESET_PASSWORD.pageDescription}
    >
      <ResetPasswordForm />
    </AuthPageLayout>
  );
}
