"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/validations/auth";
import bcrypt from "bcrypt";
import * as z from "zod";
import { VerifyEmail } from "./verify-email";
import { error } from "console";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    const { email, name, password, passwordConfirmation } = validatedData;

    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }

    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return { error: "Email already is in use. Please try another one." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const lowerCaseEmail = email.toLowerCase();

    await db.user.create({
      data: {
        email: lowerCaseEmail,
        name,
        password: hashedPassword,
      },
    });

    const res = await VerifyEmail(lowerCaseEmail);

    if (res.error) {
      return { error: "An unexpected error occurred. Please try again later." };
    }

    return { success: "Your account has been created successfully" };
  } catch (error) {
    console.error("Database error:", error);

    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        error: "Unable to connect to the database. Please try again later.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
};
