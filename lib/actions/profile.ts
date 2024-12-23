"use server";
import { getCurrentUser } from "../auth";
import { db } from "../db";

export const getProfile = async ({ username }: { username: string }) => {
  const session = await getCurrentUser();
  const userId = session?.user.id;
  console.log("Starting getProfile for username:", username);
  console.log("UserId from session:", userId);
  
  try {
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
      console.log("No profile found for username:", username);
      console.log('g', 'g');
      
      return { success: false, message: "Profile not found" };
    }
  
    console.log("Fetched profile:", profile);
    return { success: true, profile };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, message: "Could not fetch profile" };
  }
  
};
