import { Contribution, Player } from "#src/types/Contribution";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isContribution = (location: Player | Contribution | null | undefined): location is Contribution => {
  // 'token' özelliği olup olmadığını kontrol eder
  return location ? 'token' in location : false;
}

