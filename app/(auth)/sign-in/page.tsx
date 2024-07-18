import SignIn from "@/components/SignIn";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const page: FC = () => {
  return (
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center">
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

        <div className="grid place-content-center min-h-screen justify-center">
          <SignIn type="signIn"/>
        </div>
      </div>
  );
};

export default page;