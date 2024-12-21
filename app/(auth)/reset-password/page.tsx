import ForgotPassword from "@/components/Auth/forgotPasswordForm";
import NewPasswordForm from "@/components/Auth/NewPasswordForm";
import { TokenHasExpired } from "@/lib/actions/auth/token-expires";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getCurrentUser();

  const token = searchParams && searchParams.token;
  if (token && typeof token === "string") {
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
}
