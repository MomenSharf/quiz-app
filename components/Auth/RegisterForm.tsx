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
import { register } from "@/lib/actions/auth/register";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import CardWrapper from "./CardWrapper";
import { RegisterSchema } from "@/lib/validations/authSchemas";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      const res = await register(data);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <CardWrapper
      title="Register"
      headerHref="/login"
      headerLabel="Already have an account"
      headerHrefLabel="Login"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col flex-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Passwored..."
                      type={showPassword ? "text" : "password"}
                      className={cn(
                        "transition-all pr-10 bg-[hsl(var(--main-background))]",
                        {
                          "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                            form.getFieldState("password").error,
                        }
                      )}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute right-0 top-0 border-l-0 rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md bg-[hsl(var(--main-background))]"
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
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Confirm passwored..."
                      type={showPassword ? "text" : "password"}
                      className={cn(
                        "transition-all pr-10 bg-[hsl(var(--main-background))]",
                        {
                          "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                            form.getFieldState("passwordConfirmation").error,
                        }
                      )}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute right-0 top-0 border-l-0 rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md bg-[hsl(var(--main-background))]"
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
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col flex-1">
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full name..."
                    className={cn(
                      "transition-all bg-[hsl(var(--main-background))]",
                      {
                        "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                          form.getFieldState("name").error,
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
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
