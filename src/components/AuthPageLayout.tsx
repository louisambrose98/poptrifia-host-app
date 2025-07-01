import React from "react";

interface AuthPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function AuthPageLayout({
  title,
  description,
  children,
}: AuthPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Text Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8 md:p-16">
        <div className="max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 text-lg md:text-xl">{description}</p>
          )}
        </div>
      </div>
      {/* Right: Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 md:p-16">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
