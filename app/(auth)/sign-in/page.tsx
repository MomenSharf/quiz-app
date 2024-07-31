import SignIn from "@/components/Auth/SignIn";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="h-full w-full mx-auto flex flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "self-start -mt-20"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Home
      </Link>

      <div className="grid place-content-center h-full justify-center">
        <SignIn type="signIn" />
      </div>
    </div>
  );
}
