import { nanoid } from "nanoid";
import { db } from "../db";
import { getVerificationTokenByEmail } from "./verification-token";
import { generateVerificationCode } from "../utils";


export const generateVerificationToken = async (email: string) => {
    // Generate a random token 
    const token = generateVerificationCode();
    const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

    // Check if a token already exists for the user
    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // Create a new verification token
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires: new Date(expires)
        }
    })

    return verificationToken;
}