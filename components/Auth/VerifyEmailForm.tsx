"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CardWrapper from "./CardWrapper";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { newVerification } from "@/lib/actions/auth/new-verification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewPasswordForm from './NewPasswordForm'

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Your confirm code must be 6 characters.",
  }),
});

export default function VerifyEmailForm({ email }: { email: string }) {
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isVerfiyCodeRight, setIsVerfiyCodeRight] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await newVerification(data.code);
      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res.success) {
        toast({ description: res.success });
        setIsVerfiyCodeRight(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.massege,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      {!isVerfiyCodeRight ? (
        <CardWrapper
          headerHref="/login"
          headerHrefLabel="login"
          title="Confirming now..."
          headerLabel="Back to "
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center py-7 gap-3"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="flex flex-col gap-1 items-center">
                      Please enter confirm code sent to your email.
                      <Link
                        className={cn(buttonVariants({ variant: "link" }))}
                        href="mailto:mwmnshrfaldinpse@gmail.com"
                      >
                        {email}
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardWrapper>
      ) : (
        <NewPasswordForm email={email}/>
      )}
    </div>
  );
}
