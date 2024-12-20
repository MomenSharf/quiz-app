"use server";

import { getCurrentUser } from "../auth";
import { db } from "../db";
import { ProfileShemaType } from "../validations/userShemas";

export const getSettingsUser = async () => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const user = await db.user.findFirst({ where: { id: session.user.id } });
    return { success: true, user };
  } catch (error) {
    return { success: false, message: "can't get user information" };
  }
};

export const UpdateUserProfile = async (user: ProfileShemaType) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const updatedUserr = await db.user.update({
      where: { id: session.user.id },
      data: user,
    });
    if (!updatedUserr) {
      return { success: false, message: "User not found" };
    }

    return { success: true,  user };
  } catch (error) {
    return { success: false, message: "can't update profile." };
  }
};
