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
import { VerifyEmail } from "@/lib/actions/auth/verify-password";
import { cn } from "@/lib/utils";
import { ResetPasswordShema } from "@/lib/validations/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import CardWrapper from "./CardWrapper";
import VerifyEmailForm from "./VerifyEmailForm";

export default function ForgotPassword() {
  const [isSendVerificationEmailSuccess, setIsSendVerificationEmailSuccess] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordShema>>({
    resolver: zodResolver(ResetPasswordShema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordShema>) => {
    try {
      const res = await VerifyEmail(data);
      
      if (res?.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res?.success) { 
        toast({description: res.success})
        setIsSendVerificationEmailSuccess(true)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.massege,
        variant: "destructive",
      });
    }
  };

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
                        className={cn(
                          "transition-all bg-[hsl(var(--main-background))]",
                          {
                            "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                              form.getFieldState("email").error,
                          }
                        )}
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
          <VerifyEmailForm email={form.getValues("email")} />
        </motion.div>
      )}
    </div>
  );
}
