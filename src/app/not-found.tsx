import { ERROR_404 } from "@/constants/error";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <div className="text-center">
        <h1 className="text-secondary-300 mb-4">{ERROR_404.code}</h1>
        <h2 className="text-primary-300 mb-8">{ERROR_404.message}</h2>
      </div>
    </div>
  );
}
