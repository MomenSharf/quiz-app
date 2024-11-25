"use server";

import { sendVerificationEmail } from "@/lib/auth/mail";
import { generateVerificationToken } from "@/lib/auth/token";
import { getUserByEmail } from "../user.actions";
import { error } from "console";
import { db } from "@/lib/db";

export async function VerifyEmail({ email }: { email: string }) {
  try {

    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (!userExists) {
      return { error: "user not exist" };
    }
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return { success: "Email Verification was sent" };

  } catch (error) {
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
