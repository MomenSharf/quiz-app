"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import * as React from "react";
import { FC } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "There was an error logging in with Google",
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
      >
        {isLoading ? (
          <Loader2 className="animate-spin mr-1 w-4 h-4" />
        ) : (
          <div className="h-4 w-4 flex mr-1">
            <Image
              alt="google"
              src="/images/google.png"
              width={15}
              height={15}
            />
          </div>
        )}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
