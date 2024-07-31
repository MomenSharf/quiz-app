import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

export default function SignIn({ type }: { type: "signIn" | "signUp" }) {
  return (
    <div className="grid place-content-center min-h-screen justify-center">
      <Card className="dark:bg-[var(--navbar)] items-center text-center shadow-md max-w-[30rem] boder-2 border-primary scale-75 sm:scale-100">
        <CardContent>
          <div className="flex justify-center">
            
            <Image src="/assets/images/logo.png" width={100} height={100} alt="logo" />
          </div>
          <CardTitle className="text-xl font-semibold -mt-5">
            Welcome{type === "signUp" && " back"} to Quiz app
          </CardTitle>
          <CardDescription className="mt-3 text-muted-foreground">
            Wellcom back to the best quiz app not only you can paly but also you
            can make your own Quiz and shered with your frinds
          </CardDescription>

          <UserAuthForm className="py-3" />
        </CardContent>
      </Card>
    </div>
  );
}
