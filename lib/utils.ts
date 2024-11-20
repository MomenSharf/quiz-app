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

export function toCapitalize(str: string) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shuffleArray(array: any[]): any[] {
  const newArray = [...array]; // Create a shallow copy of the original array
  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]]; // Swap elements
  }
  return newArray; // Return the shuffled copy
}
