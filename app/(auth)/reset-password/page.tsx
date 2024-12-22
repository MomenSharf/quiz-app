import ForgotPassword from "@/components/Auth/forgotPasswordForm";
import NewPasswordForm from "@/components/Auth/NewPasswordForm";
import { TokenHasExpired } from "@/lib/actions/auth/token-expires";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    token?: string;
  }>;
}) {
  const session = await getCurrentUser();

  const searchParams = await props.searchParams;
  const token = searchParams?.token || "";

  const hasExpired = await TokenHasExpired(token);

  if (hasExpired) {
    if (!session) {
      return redirect("/forgot-password");
    }
    return redirect("/");
  } else {
    return (
      <div className="flex justify-center items-center h-full">
        <NewPasswordForm token={token} />
      </div>
    );
  }
}
