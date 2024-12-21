import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerifyPrismaEmail } from "@/lib/actions/auth/verify-email";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getCurrentUser();

  const token = searchParams && searchParams.token;

  if (token && typeof token === "string") {
    const { success, message } = await VerifyPrismaEmail(token);
    if (success) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Account Verified</CardTitle>
            <CardDescription>
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <Link className={cn(buttonVariants())} href="/" >
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
            <CardDescription>
            {message}
            </CardDescription>
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

  if (session) {
    return redirect("/");
  } else {
    return redirect("/login");
  }
}
