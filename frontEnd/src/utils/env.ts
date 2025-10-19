/**
 * Environment variable validation and access
 * Ensures required environment variables are set at build time
 */

const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Please ensure ${key} is defined in your .env file.`
    );
  }

  return value;
};

/**
 * Validated environment variables
 * Access these instead of import.meta.env directly
 */
export const ENV = {
  API_URL: getEnvVar("VITE_REACT_APP_API_URL"),
  // Add other environment variables here as needed
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const;

// Validate on module load
console.log("✅ Environment variables validated successfully");