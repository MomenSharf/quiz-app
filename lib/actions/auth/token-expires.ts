import { db } from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { boolean } from "zod";

export async function TokenHasExpired(token: string) : Promise<boolean> {
  try {
    const existingToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!existingToken) {
      return true
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    return hasExpired;
  } catch {
    return false;
  }
}
