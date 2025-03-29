"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Icons } from "../icons";
import Loader from "../Layout/Loader";
import { useTransition } from "react";

type SignOutProps = ButtonProps & {
  text?: string;
  iconClassName?: string;
};

export default function SignOut({
  text,
  iconClassName,
  className,
  ...props
}: SignOutProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const loginWithGoogle = async () => {
    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging out",
        variant: "destructive",
      });
    } finally {
    }
  };

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          loginWithGoogle();
        });
      }}
      className={cn("gap-1", className)}
      {...props}
    >
      {isPending ? (
        <Loader className={cn("text-destructive", iconClassName)} />
      ) : (
        <LogOut className={cn("h-4 w-4 text-destructive", iconClassName)} />
      )}
      {text ? text : "Sign out"}
    </Button>
  );
}
