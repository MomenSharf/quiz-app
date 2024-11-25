"use server";

import * as z from "zod";
import bcrypt from 'bcrypt'
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/auth/token";
import { sendVerificationEmail } from "@/lib/auth/mail";
import { RegisterSchema } from "@/lib/validations/Auth";



export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate the input data
    const validatedData = RegisterSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    //  Destructure the validated data
    const { email, name, password, passwordConfirmation } = validatedData;

    // Check if passwords match
    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }

    // Hash the password
    
    // Check to see if user already exists
    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });
    
    // If the user exists, return an error
    if (userExists) {
      return { error: "Email already is in use. Please try another one." };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const lowerCaseEmail = email.toLowerCase();

    // Create the user
    const user = await db.user.create({
      data: {
        email: lowerCaseEmail,
        name,
        password: hashedPassword,
      },
    });

    

    return { success: "Your account has been created successfully" };
  } catch (error) {
    // Handle the error, specifically check for a 503 error
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
