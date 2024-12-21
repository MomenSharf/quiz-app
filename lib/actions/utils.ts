'use server'

import { revalidatePath } from "next/cache";

export async function revalidatePathInServer(pathname: string) {
  try {
    revalidatePath(pathname);
    return {
      success: true,
      message: `Path ${pathname} revalidated successfully.`,
    };
  } catch (error) {
    console.error(`Failed to revalidate path ${pathname}:`, error);
    throw new Error(`Failed to revalidate path ${pathname}.`);
  }
}