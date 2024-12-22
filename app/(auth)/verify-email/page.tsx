import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TokenHasExpired } from "@/lib/actions/auth/token-expires";
import { VerifyPrismaEmail } from "@/lib/actions/auth/verify-email";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
    const { success, message } = await VerifyPrismaEmail(token);
    if (success) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Account Verified</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <Link className={cn(buttonVariants())} href="/">
              Go back home
            </Link>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Verified field</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <Link href="/" className={cn(buttonVariants())}>
              Go back home
            </Link>
          </CardContent>
        </Card>
      );
    }
  }
}
