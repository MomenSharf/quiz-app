"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import { db } from "../db";
import { ProfileShemaType } from "../validations/userShemas";
import { unstable_noStore as noStore } from 'next/cache';


export const getSettingsUser = async () => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    noStore()
    const user = await db.user.findFirst({ where: { id: session.user.id } });
    return { success: true, user };
  } catch (error) {
    return { success: false, message: "can't get user information" };
  }
};

export const UpdateUserProfile = async (
  user: ProfileShemaType,
  pathname?: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (existingUser && existingUser.id !== session.user.id) {
      return { success: false, message: "Username already exists." };
    }
    const updatedUserr = await db.user.update({
      where: { id: session.user.id },
      data: user,
    });
    if (!updatedUserr) {
      return { success: false, message: "User not found" };
    }

    if (pathname) revalidatePath(pathname);

    return { success: true, user };
  } catch (error) {
    console.error(error);

    return { success: false, message: "can't update profile." };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const checkSession = async () => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  return { success: true, session };
};
export const getUserByEmail = async (email: string) => {
  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await db.user.findUnique({
      where: {
        email: lowerCaseEmail,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
