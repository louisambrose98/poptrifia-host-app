import AuthPageLayout from "@/components/AuthPageLayout";
import ResetPasswordForm from "./_components/ResetPasswordForm";

export const metadata = {
  title: "Reset Password | Poptrifia",
  description: "Set a new password for your Poptrifia account.",
};

export default function ResetPassword() {
  return (
    <AuthPageLayout
      title="Reset Password"
      description="Set your new password below."
    >
      <ResetPasswordForm />
    </AuthPageLayout>
  );
}
