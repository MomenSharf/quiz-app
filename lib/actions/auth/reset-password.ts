"use server";

import { db } from "@/lib/db";
import bcrypt from 'bcrypt'


export async function resetPassword({ email, password, passwordConfirmation }: { email: string, password: string;
  passwordConfirmation: string; }) {
  try {


    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }
    
    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (!userExists) {
      return { error: "user not exist" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await db.user.update({
      where: {
        id: userExists.id
      },
      data: {
        password: hashedPassword,
      },
    });
    


    return { success: "Your password has been reset successfully!" };

  } catch (error) {
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
