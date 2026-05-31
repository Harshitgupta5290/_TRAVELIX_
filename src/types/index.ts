import { User, Hotel, Package, Booking, Category, Review } from "@prisma/client";

// ─── Extended Types ────────────────────────────────────────────────────────

export type PackageWithRelations = Package & {
  hotel?: Hotel | null;
  category?: Category | null;
  reviews?: Review[];
  _count?: { bookings: number; reviews: number };
};

export type HotelWithRelations = Hotel & {
  category?: Category | null;
  reviews?: Review[];
  _count?: { reviews: number; packages: number };
};

export type BookingWithRelations = Booking & {
  package: Package & {
    hotel?: Hotel | null;
  };
  user: Pick<User, "id" | "name" | "email" | "phone" | "avatar">;
};

export type UserWithCounts = User & {
  _count: {
    bookings: number;
    reviews: number;
  };
};

// ─── API Response Types ────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Filter Types ──────────────────────────────────────────────────────────

export interface PackageFilters {
  source?: string;
  destination?: string;
  days?: string;
  categoryId?: string;
  medium?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  featured?: boolean;
  page?: string;
}

export interface HotelFilters {
  city?: string;
  categoryId?: string;
  stars?: string;
  search?: string;
  featured?: boolean;
  page?: string;
}

// ─── Form Types ────────────────────────────────────────────────────────────

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProfileFormData {
  name: string;
  phone?: string;
  gender?: string;
  dob?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  pinCode?: string;
}

export interface BookingFormData {
  packageId: string;
  cardType: string;
  nameOnCard: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  travelDate?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// ─── Navigation Types ──────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
}

// ─── Stats ────────────────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  icon: string;
  description?: string;
}
