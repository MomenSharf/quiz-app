"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathInServer(pathname: string) {
  try {
    revalidatePath(pathname);
    return {
      success: true,
      message: `Path ${pathname} revalidated successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Path ${pathname} does not validate properly.`,
    };
  }
}
