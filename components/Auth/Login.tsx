"use client";
import { registerUser } from "@/lib/actions/auth.action";
import { cn } from "@/lib/utils";
import {
  loginSchema,
  loginSchemaType,
  regiseterSchema,
  regiseterSchemaType,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icons } from "../icons";
import Logo from "../Layout/Logo";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export default function Login({ type }: { type: "register" | "login" }) {
  const [isloginWithGoogle, setloginWithGoogle] = useState(false);
  const [isloginWithFacebook, setisloginWithFacebook] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const loginWithGoogle = async () => {
    setloginWithGoogle(true);

    try {
      signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setloginWithGoogle(false);
    }
  };

  const registerform = useForm<regiseterSchemaType>({
    resolver: zodResolver(regiseterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const loginform = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const regiser = async (values: regiseterSchemaType) => {
    try {
      const newUser = await registerUser(values);

      if (newUser) {
        toast({
          title: "successfully",
          description: newUser.message,
        });

        router.push("/login");
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.log(error.message);

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const login = async (values: loginSchemaType) => {
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (result?.ok) return router.push("/");

      if (result?.error) {
        console.log(result.error);

        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong! try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Link href="/">
        <Logo />
      </Link>

      <div className="bg-card p-4 flex flex-col justify-center rounded-xl">
        <h1 className="font-bold text-2xl text-center">
          {type === "login" ? "Login" : "Sign up"}
        </h1>
        {type === "register" ? (
          <p className="font-semibold text-xs text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        ) : (
          <p className="font-semibold text-xs text-center">
            No Account?{" "}
            <Link
              href="/register"
              className="font-bold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        )}
        {type === "register" ? (
          <Form {...registerform}>
            <form
              className="my-5 flex flex-col  justify-start gap-3 transition-all min-w-72"
              onSubmit={registerform.handleSubmit(regiser)}
            >
              <FormField
                control={registerform.control}
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
                              registerform.getFieldState("email").error,
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
                control={registerform.control}
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
                                registerform.getFieldState("password").error,
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
                control={registerform.control}
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
                              registerform.getFieldState("name").error,
                          }
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-extralight mt-0" />
                  </FormItem>
                )}
              />
              <Button disabled={registerform.formState.isSubmitting}>
                {registerform.formState.isSubmitting && (
                  <Icons.Loader className="w-4 h-4 mr-2 animate-spin stroke-primary-foreground" />
                )}
                Sign Up
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...loginform}>
            <form
              className="my-5 flex flex-col  justify-start gap-3 transition-all min-w-72"
              onSubmit={loginform.handleSubmit(login)}
            >
              <FormField
                control={loginform.control}
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
                            "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                              loginform.getFieldState("email").error,
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
                control={loginform.control}
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
                              "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                                loginform.getFieldState("password").error,
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
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-extralight mt-0" />
                  </FormItem>
                )}
              />

              <Button disabled={loginform.formState.isSubmitting}>
                {loginform.formState.isSubmitting && (
                  <Icons.Loader className="w-4 h-4 mr-2 animate-spin stroke-primary-foreground" />
                )}
                Log in
              </Button>
            </form>
          </Form>
        )}
        <div className="relative w-full h-px bg-border my-1">
          <span className="absolute left-1/2 -translate-x-1/2 -top-1/2 -translate-y-1/2 p-2 bg-card rounded-full text-muted-foreground">
            Or
          </span>
        </div>
        <div className="w-full flex gap-3 justify-center mt-6">
          <Button
            size="icon"
            variant="outline"
            className="px-4 py-8 w-full gap-2"
            onClick={loginWithGoogle}
          >
            {isloginWithGoogle ? (
              <Icons.Loader className="w-7 h-7 animate-spin stroke-muted-foreground" />
            ) : (
              <Icons.google className="w-8 h-8" />
            )}
            <span className="font-bold">Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
