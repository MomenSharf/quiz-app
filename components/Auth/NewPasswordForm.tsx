"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/actions/auth/reset-password";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import CardWrapper from "./CardWrapper";
import { NewPasswordSchema } from "@/lib/validations/authSchemas";

export default function NewPasswordForm({ token }: { token: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    try {
      const res = await resetPassword({ ...data, token });
      if (res?.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res?.success) {
        toast({ description: res.success });
        router.push("/login");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.massege,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {});

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <CardWrapper
      title="Register"
      headerHref="/login"
      headerLabel="Already have an account"
      headerHrefLabel="Login"
    >
      <Form {...form}>
        <form
          className="my-5 flex flex-col  justify-start gap-3 transition-all min-w-72"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col flex-1">
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="New passwored..."
                      type={showPassword ? "text" : "password"}
                      className={cn("transition-all pr-10 main-background", {
                        "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                          form.getFieldState("password").error,
                      })}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute right-0 top-0 border-l-0 rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md main-background"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-extralight mt-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col flex-1">
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Confirm passwored..."
                      type={showPassword ? "text" : "password"}
                      className={cn("transition-all pr-10 main-background", {
                        "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                          form.getFieldState("passwordConfirmation").error,
                      })}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute right-0 top-0 border-l-0 rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md main-background"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-extralight mt-0" />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icons.Loader className="w-4 h-4 mr-2 animate-spin stroke-primary-foreground" />
            )}
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
