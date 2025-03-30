import LoginForm from "@/components/Auth/LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page(props: {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
}) {
  const session = await getCurrentUser();

  if (session) {
    return redirect("/");
  }

  const searchParams = await props.searchParams;

  const callbackUrl = searchParams?.callbackUrl || "/";

  return (
    <div className="flex justify-center items-center h-full">
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
