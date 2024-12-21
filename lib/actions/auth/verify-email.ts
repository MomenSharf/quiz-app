"use server";

import { sendVerificationEmail } from "@/lib/auth/mail";
import { generateVerificationToken } from "@/lib/auth/token";
import { db } from "@/lib/db";
import { TokenHasExpired } from "./token-expires";
import Email from "next-auth/providers/email";

export async function VerifyEmail(email: string ) {
  try {

    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      return {  success: false,  message: "user not exist" };
    }
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return {  success: true,  message: "Email Verification was sent" };

  } catch (error) {
    console.log(error);
    
    return {  success: false,  message: "An unexpected error occurred. Please try again later." };
  }
}

export async function VerifyPrismaEmail (token: string)  {

  try {
 

    const existingToken = await db.verificationToken.findFirst(({
      where: {
        token
      }
    }))

    if(!existingToken)  {
      return {  success: false,  message: "Unauthorized access. Please check your credentials or the token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) {
      return { success: false,  message: "Unauthorized access. Please check your credentials or the token" };
        // return redirect('/')
    }

    const userExists = await db.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });

    if (!userExists) {
      return { success: false,  message: "user not exist" };
    }

    if(userExists.emailVerified) {
      return { success: false,  message: "the user aready verified" }
    }


    await db.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })

    return { success: true,  message: "Your password has been reset successfully!" };
  } catch (error) {console.log(error);
  
    return { success: false,  message: "An unexpected error occurred. Please try again later." };
  }
}

