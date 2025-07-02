import Navbar from "@/components/Navbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="p-8">{children}</main>
    </div>
  );
}
