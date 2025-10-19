/**
 * Application-wide constants
 * Centralizes magic numbers and strings for better maintainability
 */

// Validation constants
export const VALIDATION = {
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 6,
  ADDRESS_MIN_LENGTH: 5,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  PRODUCTS_PER_PAGE: 8,
} as const;

// Price filter constants
export const PRICE_FILTER = {
  MIN_PRICE: 0,
  MAX_PRICE: 5000,
  DEFAULT_MIN: 0,
  DEFAULT_MAX: 5000,
} as const;

// Phone number placeholder
export const DEFAULT_PHONE_NUMBER = "0000000000";

// Toast notification durations (in milliseconds)
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 4000,
  INFO: 3000,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH: "auth",
  PRODUCTS: "products",
  WISHLIST: "wishlist",
  CART: "cart",
} as const;

// API timeout (in milliseconds)
export const API_TIMEOUT = 10000;

// Debounce delay for search (in milliseconds)
export const SEARCH_DEBOUNCE_DELAY = 300;