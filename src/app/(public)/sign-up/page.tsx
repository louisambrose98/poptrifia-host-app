import AuthPageLayout from "@/components/AuthPageLayout";
import SignUpForm from "./_components/SignUpForm";

export default function SignUp() {
  return (
    <AuthPageLayout
      title="Sign Up"
      description="Create a new Poptrifia account."
    >
      <SignUpForm />
    </AuthPageLayout>
  );
}

export const metadata = {
  title: "Sign Up | Poptrifia",
  description: "Create a new Poptrifia account and join the fun!",
};
