export default function MiddleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50 text-black">{children}</div>;
}
