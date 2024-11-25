import LoginForm from "@/components/Auth/LoginForm";
import VerifyEmailForm from "@/components/Auth/VerifyEmailForm";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function page() {

  const session = await getCurrentUser();

  if (session) {
    return notFound()
  }

  return (
    <div className="flex justify-center items-center h-full">
      <LoginForm />
    </div>
  );
}
