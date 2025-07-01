import AuthPageLayout from "@/components/AuthPageLayout";
import { CONFIRM_EMAIL } from "@/constants/authPageText";
import { METADATA_CONFIRM_EMAIL } from "@/constants/metadata";
import { Metadata } from "next";
import ConfirmEmailForm from "./_components/ConfirmEmailForm";

export const metadata: Metadata = {
  title: METADATA_CONFIRM_EMAIL.title,
  description: METADATA_CONFIRM_EMAIL.description,
};

export default function ConfirmEmail() {
  return (
    <AuthPageLayout
      title={CONFIRM_EMAIL.pageTitle}
      description={CONFIRM_EMAIL.pageDescription}
    >
      <ConfirmEmailForm />
    </AuthPageLayout>
  );
}
