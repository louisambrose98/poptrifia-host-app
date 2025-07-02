import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center gap-6 px-8 py-4 border-b bg-card">
        <span className="font-bold text-lg tracking-tight">Poptrifia</span>
        <Link href={ROUTES.DASHBOARD} className="hover:underline">
          Dashboard
        </Link>
        <Link href={ROUTES.QUESTIONS} className="hover:underline">
          Question
        </Link>
        <Link href={ROUTES.QUIZ} className="hover:underline">
          Quiz
        </Link>
        <Link href={ROUTES.STATUS} className="hover:underline">
          Status
        </Link>
        <Link href={ROUTES.SETTINGS} className="hover:underline ml-auto">
          Settings
        </Link>
        <Link href={ROUTES.SUPPORT} className="hover:underline">
          Support
        </Link>
      </nav>
      <main className="p-8">{children}</main>
    </div>
  );
}
