import AuthPageLayout from "@/components/AuthPageLayout";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | Poptrifia",
  description: "Reset your Poptrifia account password easily.",
};

export default function ForgotPassword() {
  return (
    <AuthPageLayout
      title="Forgot Password"
      description="Enter your email to reset your password."
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
