"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import * as React from "react";
import { FC } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignOut: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      console.log(error);

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
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        isLoading={isLoading}
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
        variant='ghost'
      >
        {isLoading ? (
          <Loader2 className="animate-spin mr-1 w-4 h-4" />
        ) : (
          <LogOut className="mr-2 h-4 w-4 text-destructive" />
        )}
        Sign out
      </Button>
    </div>
  );
};

export default SignOut;
