import { signIn } from "next-auth/react";
import Logo from "../Layout/Logo";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import Link from "next/link";
import { Icons } from "../icons";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  headerLabel?: string;
  headerHref?: string;
  headerHrefLabel?: string;
  isSignWithGoogleOption?: boolean;
}
export default function CardWrapper({
  children,
  title,
  headerLabel,
  headerHref,
  headerHrefLabel,
  isSignWithGoogleOption = false,
}: CardWrapperProps) {
  const [isloginWithGoogle, setloginWithGoogle] = useState(false);

  const loginWithGoogle = async () => {
    setloginWithGoogle(true);

    try {
      signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setloginWithGoogle(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 items-center">
      <Link href="/">
        <Logo />
      </Link>

      <div className="bg-card p-4 flex flex-col justify-center rounded-xl">
        <h1 className="font-bold text-2xl text-center">{title}</h1>

        {headerLabel && headerHrefLabel && headerHref && <p className="font-semibold text-xs text-center flex gap-1 justify-center">
          {headerLabel}
          <Link
            href={headerHref}
            className="font-bold text-primary hover:underline"
          >
            {headerHrefLabel}
          </Link>
        </p>}

        {children}
        {isSignWithGoogleOption && (
          <div>
            <div className="relative w-full h-px bg-border my-1">
              <span className="absolute left-1/2 -translate-x-1/2 -top-1/2 -translate-y-1/2 p-2 bg-card rounded-full text-muted-foreground">
                Or
              </span>
            </div>
            <div className="w-full flex gap-3 justify-center mt-6">
              <Button
                size="icon"
                variant="outline"
                className="px-4 py-8 w-full gap-2"
                onClick={loginWithGoogle}
              >
                {isloginWithGoogle ? (
                  <Icons.Loader className="w-7 h-7 animate-spin stroke-muted-foreground" />
                ) : (
                  <Icons.google className="w-8 h-8" />
                )}
                <span className="font-bold">Continue with Google</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
