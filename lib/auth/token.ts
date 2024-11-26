import { nanoid } from "nanoid";
import { db } from "../db";
import { getVerificationTokenByEmail } from "./verification-token";
import { generateVerificationCode } from "../utils";
import crypto from "crypto";

export const generateVerificationToken = async (
  email: string,
) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date().getTime() + 1000 * 60 * 30;

  const existingToken = await getVerificationTokenByEmail(email);
  
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return verificationToken;
};
