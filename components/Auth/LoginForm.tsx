"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { register } from "@/lib/actions/auth/register";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import CardWrapper from "./CardWrapper";
import { toast } from "../ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginSchema } from "@/lib/validations/authSchemas";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.ok) {
      toast({
        description:
          "Login successful! Welcome back! We're glad to see you again—let's dive in",
      });

      router.push(callbackUrl);
    }
    if (res?.error) {
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    form.setFocus('email')
  }, [form])

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <CardWrapper
      title="Login"
      headerHref={`/register?callbackUrl=${callbackUrl}`}
      headerLabel="Don't have an account? "
      headerHrefLabel="register"
      isSignWithGoogleOption
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col flex-1">
                <FormLabel>password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Passwored..."
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
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icons.Loader className="w-4 h-4 mr-2 animate-spin stroke-primary-foreground" />
            )}
            Login
          </Button>
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="font-bold text-primary hover:underline text-xs"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
