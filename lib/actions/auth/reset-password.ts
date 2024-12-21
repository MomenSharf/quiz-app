"use server";

import { sendVerificationEmailDeleteAccount, sendVerificationEmailResetPassword } from "@/lib/auth/mail";
import { generateVerificationToken } from "@/lib/auth/token";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function resetPassword({
  token,
  password,
  passwordConfirmation,
}: {
  token: string;
  password: string;
  passwordConfirmation: string;
}) {
  try {
    if (password !== passwordConfirmation) {
      return { success: false,  message: "Passwords do not match" };
    }

    const existingToken = await db.verificationToken.findFirst(({
      where: {
        token
      }
    }))

    if(!existingToken)  {
      return { success: false,  message: "Unauthorized access. Please check your credentials or the token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) {
      return { success: false,  message: "Unauthorized access. Please check your credentials or the token" };
    }

    const userExists = await db.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });

    if (!userExists) {
      return { success: false,  message: "user not exist" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })

    return { success: true,  message: "Your password has been reset successfully!" };
  } catch (error) {
    return { success: false,  message: "An unexpected error occurred. Please try again later." };
  }
}

export async function VerifyEmailToResetPassword({ email }: { email: string }) {
  try {

    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      return { error: "user not exist" };
    }
    const verificationToken = await generateVerificationToken(email);

    

    await sendVerificationEmailResetPassword(email, verificationToken.token);

    return { success: "Email Verification was sent" };

  } catch (error) {
    console.log(error);
    
    return { error: "An unexpected error occurred. Please try again later." };
  }
}

