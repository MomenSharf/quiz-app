"use server";
import { getCurrentUser } from "../auth";
import { db } from "../db";
import { unstable_noStore as noStore } from "next/cache";
import { getSearchQuizzes } from "./search";

export const getProfile = async ({ username }: { username: string }) => {
  const session = await getCurrentUser();
  const userId = session?.user.id;

  try {
    noStore();
    const profile = await db.user.findUnique({
      where: { username },
    });

    if (!profile) {
      return { success: false, message: "Profile not found" };
    }

    const {quizzes} = await getSearchQuizzes({ userId: profile.id });
    return { success: true, profile: { ...profile, quizzes } };
  } catch (error) {
    return { success: false, message: "Could not fetch profile" };
  }
};
