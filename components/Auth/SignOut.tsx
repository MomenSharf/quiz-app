"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import * as React from "react";

type SignOutProps = ButtonProps & {
  text?: string;
  iconClassName?: string;
};

export default function SignOut({ text, iconClassName, ...props }: SignOutProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={loginWithGoogle} {...props}>
      {isLoading ? (
        <Loader2 className={cn("animate-spin mr-1 w-4 h-4", iconClassName)} />
      ) : (
        <LogOut
          className={cn("mr-2 h-4 w-4 text-destructive", iconClassName)}
        />
      )}
      {text ? text : "Sign out"}
    </Button>
  );
}
