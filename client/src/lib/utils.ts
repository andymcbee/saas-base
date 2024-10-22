import { clsx, type ClassValue } from "clsx";
import { CookieValueTypes, getCookie } from "cookies-next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
