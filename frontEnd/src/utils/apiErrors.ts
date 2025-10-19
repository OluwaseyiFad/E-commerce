import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

/**
 * API Error handling utilities
 * Converts RTK Query errors into user-friendly messages
 */

export type ApiError = FetchBaseQueryError | SerializedError;

/**
 * Get user-friendly error message from RTK Query error
 */
export const getErrorMessage = (error: ApiError): string => {
  // Handle FetchBaseQueryError
  if ("status" in error) {
    // HTTP status code errors
    if (typeof error.status === "number") {
      switch (error.status) {
        case 400:
          return "Invalid request. Please check your information and try again.";
        case 401:
          return "You are not authorized. Please log in and try again.";
        case 403:
          return "Access denied. You don't have permission to perform this action.";
        case 404:
          return "The requested resource was not found.";
        case 409:
          return "This resource already exists or conflicts with existing data.";
        case 422:
          return "The data you provided is invalid. Please check and try again.";
        case 429:
          return "Too many requests. Please wait a moment and try again.";
        case 500:
          return "Server error. Please try again later.";
        case 502:
        case 503:
          return "Service temporarily unavailable. Please try again later.";
        case 504:
          return "Request timeout. Please check your connection and try again.";
        default:
          return `An error occurred (${error.status}). Please try again.`;
      }
    }

    // FETCH_ERROR (network error)
    if (error.status === "FETCH_ERROR") {
      return "Network error. Please check your internet connection and try again.";
    }

    // PARSING_ERROR
    if (error.status === "PARSING_ERROR") {
      return "Error processing server response. Please try again.";
    }

    // TIMEOUT_ERROR
    if (error.status === "TIMEOUT_ERROR") {
      return "Request timeout. Please try again.";
    }

    // CUSTOM_ERROR
    if (error.status === "CUSTOM_ERROR") {
      return error.error || "An error occurred. Please try again.";
    }
  }

  // Handle SerializedError
  if ("message" in error && error.message) {
    return error.message;
  }

  // Fallback
  return "An unexpected error occurred. Please try again.";
};

/**
 * Get error message for specific operations
 */
export const getOperationError = (operation: string, error: ApiError): string => {
  const baseMessage = getErrorMessage(error);

  const operationMessages: Record<string, string> = {
    login: "Login failed. ",
    register: "Registration failed. ",
    logout: "Logout failed. ",
    "add-to-cart": "Failed to add item to cart. ",
    "remove-from-cart": "Failed to remove item from cart. ",
    "update-cart": "Failed to update cart. ",
    "place-order": "Failed to place order. ",
    "fetch-products": "Failed to load products. ",
    "fetch-orders": "Failed to load orders. ",
    "update-profile": "Failed to update profile. ",
  };

  const prefix = operationMessages[operation] || "";
  return prefix + baseMessage;
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: ApiError): boolean => {
  return "status" in error && error.status === "FETCH_ERROR";
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: ApiError): boolean => {
  return "status" in error && (error.status === 401 || error.status === 403);
};

/**
 * Check if error is a validation error
 */
export const isValidationError = (error: ApiError): boolean => {
  return "status" in error && (error.status === 400 || error.status === 422);
};
