import { VerifyPrismaEmail } from "@/lib/actions/auth/verify-email";
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
    await VerifyPrismaEmail(token);
  }

  if (session) {
    return redirect("/");
  } else {
    return redirect("/login");
  }
}
