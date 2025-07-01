import AuthPageLayout from "@/components/AuthPageLayout";
import SignInForm from "./_components/SignInForm";

export const metadata = {
  title: "Sign In | Poptrifia",
  description:
    "Sign in to your Poptrifia account to access your dashboard and more.",
};

export default function SignIn() {
  return (
    <AuthPageLayout
      title="Sign In"
      description="Sign in to your Poptrifia account."
    >
      <SignInForm />
    </AuthPageLayout>
  );
}
