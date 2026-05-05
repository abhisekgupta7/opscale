import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

/**
 * Verify JWT token (utility function - not a server action)
 */
export function verifyAdminToken(token: string): {
  valid: boolean;
  payload?: any;
  error?: string;
} {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid token",
    };
  }
}
