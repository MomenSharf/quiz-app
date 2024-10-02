import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";

import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function formatTimeAgo(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
