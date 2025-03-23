'use server'
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import { db } from "../db";

export const newFolder = async ({
  title,
  parentId,
  pathname,
}: {
  title: string;
  parentId?: string;
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const folder = await db.folder.create({
      data: {
        userId: session.user.id,
        title: title || "New Folder",
        parentId,
      },
    });

    revalidatePath(pathname);

    return { success: true, folder: folder };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create folder. Please try again later.",
    };
  }
};