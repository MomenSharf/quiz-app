import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import UserAuthForm from "@/components/forms/UserAuthForm";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignIn({ type }: { type: "signIn" | "signUp" }) {
  return (
    <main className="grid place-content-center min-h-screen justify-center">
      <Card className="dark:bg-[var(--nav-bar)] items-center text-center shadow-md max-w-[30rem] boder-2 border-primary scale-75 sm:scale-100">
        <CardContent>
          <div className="flex justify-center">
            
            <Image src="/images/logo.png" width={100} height={100} alt="logo" />
          </div>
          <CardTitle className="text-xl font-semibold -mt-5">
            Welcome{type === "signUp" && " back"} to Quiz app
          </CardTitle>
          <CardDescription className="mt-3 text-muted-foreground">
            Wellcom back to the best quiz app not only you can paly but also you
            can make your own Quiz and shered with your frinds
          </CardDescription>

          <UserAuthForm className="py-3" />
          {/* <CardFooter className="justify-center p-0">
            {type === "signIn" ? (
              <a
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "font-extralight"
                )}
              >
                Aleardy have an accunt, sign up
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            ) : (
              <a
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "font-extralight"
                )}
              >
                You {"don't"} have account sign in
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            )}
          </CardFooter> */}
        </CardContent>
      </Card>
    </main>
  );
}
