"use server";
import * as z from "zod";
import { getUserByEmail } from "../user.actions";
import { signIn } from "next-auth/react";
import { LoginSchema } from "@/lib/validations/authSchemas";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  // Validate the input data
  const validatedData = LoginSchema.safeParse(data);

  // If the data is invalid, return an error
  if (!validatedData.success) {
    return { error: "Invalid input data" };
  }

  // Destructure the validated data
  const {
    data: { email, password },
  } = validatedData;

  // Check if user exists
  const userExists = await getUserByEmail(email);

  // If the user does not exist, return an error
  if (!userExists || !userExists.email || !userExists.password) {
    return { error: "User does not exist" };
  }

  try {
    const result = await signIn("credentials", {
      email: userExists.email,
      password: password,
    });

    // if(result?.ok) return {su}

    // Check if there is an error from next-auth in the result
    if (result?.error) {
      // next-auth error handling
      if (result.error === "CredentialsSignin") {
        return { error: "Invalid credentials" };
      }
      return { error: result.error }; // Return any other error from next-auth
    }
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid input data" };
    }

    // Handle other types of errors
    if (error instanceof Error) {
      // Determine if the error is specific to next-auth
      if (error.message.includes("NextAuth")) {
        return { error: "An error occurred with next-auth" };
      }
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }

  return { success: "User logged in successfully" };
};
