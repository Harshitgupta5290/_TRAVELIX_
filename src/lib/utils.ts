import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function mediumLabel(medium: string): string {
  const map: Record<string, string> = {
    FLIGHT: "✈️ Flight",
    TRAIN: "🚂 Train",
    BUS: "🚌 Bus",
    ROAD: "🚗 Road",
  };
  return map[medium] ?? medium;
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    CONFIRMED: "text-green-600 bg-green-50 border-green-200",
    PENDING: "text-yellow-600 bg-yellow-50 border-yellow-200",
    CANCELLED: "text-red-600 bg-red-50 border-red-200",
    COMPLETED: "text-blue-600 bg-blue-50 border-blue-200",
    ACTIVE: "text-green-600 bg-green-50 border-green-200",
    INACTIVE: "text-gray-600 bg-gray-50 border-gray-200",
    SOLDOUT: "text-red-600 bg-red-50 border-red-200",
  };
  return map[status] ?? "text-gray-600 bg-gray-50 border-gray-200";
}

export function parseJsonField<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
