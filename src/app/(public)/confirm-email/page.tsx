import AuthPageLayout from "@/components/AuthPageLayout";
import ConfirmEmailForm from "./_components/ConfirmEmailForm";

export const metadata = {
  title: "Confirm Email | Poptrifia",
  description: "Confirm your email address to activate your Poptrifia account.",
};

export default function ConfirmEmail() {
  return (
    <AuthPageLayout
      title="Confirm Email"
      description="Please check your email for a confirmation code."
    >
      <ConfirmEmailForm />
    </AuthPageLayout>
  );
}
