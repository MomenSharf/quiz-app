"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import * as z from "zod";
import { VerifyEmail } from "./verify-email";
import { error } from "console";
import { RegisterSchema } from "@/lib/validations/authSchemas";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    if (!validatedData) {
      return { success: false, message: "Invalid input data" };
    }

    const { email, name, password, passwordConfirmation } = validatedData;

    if (password !== passwordConfirmation) {
      return { success: false, message: "Passwords do not match" };
    }

    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return {
        success: false,
        message: "Email already is in use. Please try another one.",
      };
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

    const { success, message } = await VerifyEmail(lowerCaseEmail);

    if (!success) {
      return { success: false, message };
    }

    return {
      success: true,
      message: "Your account has been created successfully",
    };
  } catch (error) {
    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        success: false,
        message: "Unable to connect to the database. Please try again later.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        success: false,
        message: "Service temporarily unavailable. Please try again later.",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};
