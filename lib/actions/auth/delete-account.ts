"use server";

import {
  sendVerificationEmailDeleteAccount,
  sendVerificationEmailResetPassword,
} from "@/lib/auth/mail";
import { generateVerificationToken } from "@/lib/auth/token";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function deleteAcount({ token }: { token: string }) {
  try {
    const existingToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!existingToken) {
      return {
        success: false,
        message:
          "Unauthorized access. Please check your credentials or the token",
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return {
        success: false,
        message:
          "Unauthorized access. Please check your credentials or the token",
      };
      // return redirect('/')
    }

    const userExists = await db.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });

    if (!userExists) {
      return { success: false, message: "user not exist" };
    }

    await db.user.delete({
      where: {
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: true,
      message: "Your account has been deleted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function VerifyEmailDeleteAccount({ email }: { email: string }) {
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

    await sendVerificationEmailDeleteAccount(email, verificationToken.token);

    return { success: "Email Verification was sent" };
  } catch (error) {
    console.log(error);

    return { error: "An unexpected error occurred. Please try again later." };
  }
}
