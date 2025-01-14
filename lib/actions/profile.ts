"use server";
import { getCurrentUser } from "../auth";
import { db } from "../db";
import { unstable_noStore as noStore } from 'next/cache';


export const getProfile = async ({ username }: { username: string }) => {
  const session = await getCurrentUser();
  const userId = session?.user.id;
  
  try {
    noStore()
    const profile = await db.user.findUnique({
      where: { username },
      include: {
        quizzes: {
          include: {
            user: true,
            bookmarks: userId
              ? {
                  where: { userId },
                }
              : undefined,
            questions: true,
            ratings: true,
          },
        },
      },
    });
  
    if (!profile) {
      return { success: false, message: "Profile not found" };
    }

    return { success: true, profile };
  } catch (error) {
    return { success: false, message: "Could not fetch profile" };
  }
  
};
