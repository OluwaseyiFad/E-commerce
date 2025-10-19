import DOMPurify from "dompurify";

/**
 * Sanitization Utilities
 *
 * Provides functions to sanitize user input and prevent XSS attacks.
 * Uses DOMPurify to remove malicious code from user-provided content.
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param dirty - The potentially unsafe HTML string
 * @returns Sanitized HTML string safe for rendering
 *
 * @example
 * const userInput = '<script>alert("XSS")</script><p>Hello</p>';
 * const safe = sanitizeHtml(userInput); // Returns: '<p>Hello</p>'
 */
export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "br", "span"],
    ALLOWED_ATTR: [],
  });
};

/**
 * Sanitize plain text input (removes all HTML tags)
 *
 * @param dirty - The potentially unsafe text string
 * @returns Plain text string with all HTML removed
 *
 * @example
 * const userInput = '<script>alert("XSS")</script>Hello';
 * const safe = sanitizeText(userInput); // Returns: 'Hello'
 */
export const sanitizeText = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

/**
 * Sanitize form input data (object with string values)
 *
 * @param data - Object containing form field values
 * @returns Object with all string values sanitized
 *
 * @example
 * const formData = {
 *   name: '<script>alert("XSS")</script>John',
 *   email: 'john@example.com',
 *   age: 25
 * };
 * const safe = sanitizeFormData(formData);
 * // Returns: { name: 'John', email: 'john@example.com', age: 25 }
 */
export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
  const sanitized: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeText(value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
    } else if (value === null || value === undefined) {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitizeText(item) : item
      );
    } else if (typeof value === "object") {
      sanitized[key] = sanitizeFormData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
};

/**
 * Sanitize a URL to prevent javascript: and data: URIs
 *
 * @param url - The potentially unsafe URL string
 * @returns Sanitized URL or empty string if invalid
 *
 * @example
 * const maliciousUrl = 'javascript:alert("XSS")';
 * const safe = sanitizeUrl(maliciousUrl); // Returns: ''
 *
 * const goodUrl = 'https://example.com';
 * const safe2 = sanitizeUrl(goodUrl); // Returns: 'https://example.com'
 */
export const sanitizeUrl = (url: string): string => {
  const sanitized = DOMPurify.sanitize(url);

  // Check for dangerous protocols
  if (
    sanitized.startsWith("javascript:") ||
    sanitized.startsWith("data:") ||
    sanitized.startsWith("vbscript:")
  ) {
    return "";
  }

  return sanitized;
};

/**
 * Create a safe HTML component for React
 * Use this to render sanitized HTML in React components
 *
 * @param html - The HTML string to sanitize and render
 * @returns Object with dangerouslySetInnerHTML prop
 *
 * @example
 * const UserComment = ({ comment }: { comment: string }) => (
 *   <div {...createSafeHtml(comment)} />
 * );
 */
export const createSafeHtml = (html: string) => {
  return {
    dangerouslySetInnerHTML: {
      __html: sanitizeHtml(html),
    },
  };
};

/**
 * Validate and sanitize email addresses
 *
 * @param email - The email string to validate and sanitize
 * @returns Sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email: string): string => {
  const sanitized = sanitizeText(email.trim().toLowerCase());

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return "";
  }

  return sanitized;
};

/**
 * Sanitize search queries
 * Allows alphanumeric characters, spaces, and common punctuation
 *
 * @param query - The search query to sanitize
 * @returns Sanitized search query
 */
export const sanitizeSearchQuery = (query: string): string => {
  const sanitized = sanitizeText(query);

  // Remove potentially dangerous characters but keep useful ones
  return sanitized.replace(/[^a-zA-Z0-9\s\-_.,']/g, "");
};