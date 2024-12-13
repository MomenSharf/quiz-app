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
import { VerifyEmailToResetPassword } from "@/lib/actions/auth/reset-password";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import CardWrapper from "./CardWrapper";
import NewPasswordForm from "./NewPasswordForm";
import { ResetPasswordShema } from "@/lib/validations/authSchemas";

export default function ForgotPassword() {
  const [isSendVerificationEmailSuccess, setIsSendVerificationEmailSuccess] =
    useState(false);

  const token = useSearchParams().get("token");

  const form = useForm<z.infer<typeof ResetPasswordShema>>({
    resolver: zodResolver(ResetPasswordShema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordShema>) => {
    try {
      const res = await VerifyEmailToResetPassword(data);

      if (res?.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res?.success) {
        toast({ description: res.success });
        setIsSendVerificationEmailSuccess(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.massege,
        variant: "destructive",
      });
    }
  };

  if (token) return <NewPasswordForm token={token} />;

  return (
    <div>
      {!isSendVerificationEmailSuccess ? (
        <CardWrapper
          title="Reset Password"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex w-full flex-col flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email..."
                        className={cn("transition-all main-background", {
                          "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                            form.getFieldState("email").error,
                        })}
                        {...field}
                      />
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
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
        >
          <CardWrapper title="Recovery email sent">
            <div className="mt-3 text-sm mx-10">
              <p className="text-center">
                An e-mail has been sent to <br />{" "}
              </p>
              <p>
                <Link
                  className="font-bold text-primary hover:underline text-xs"
                  href="mailto:mwmnshrfaldinpse@gmail.com"
                >
                  {"momefsadf asfdas@.fsadf"}
                </Link>{" "}
                with further instructions.
              </p>
            </div>
          </CardWrapper>
        </motion.div>
      )}
    </div>
  );
}
