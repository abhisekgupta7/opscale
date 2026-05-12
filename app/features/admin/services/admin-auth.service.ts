import { db } from "@/lib/db/client";
import { adminUsersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  admin?: AdminUser;
  token?: string;
}

/**
 * Find admin by email
 */
export async function findAdminByEmail(
  email: string,
): Promise<AdminUser | null> {
  try {
    const admin = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.email, email))
      .limit(1);

    return admin[0] || null;
  } catch (error) {
    console.error("Error finding admin:", error);
    return null;
  }
}

/**
 * Create new admin account
 */
export async function createAdminAccount(
  email: string,
  name: string,
  password: string,
): Promise<AdminLoginResponse> {
  try {
    // Check if admin already exists
    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) {
      return {
        success: false,
        message: "Admin account with this email already exists",
      };
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create admin
    const [newAdmin] = await db
      .insert(adminUsersTable)
      .values({
        email,
        name,
        passwordHash,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        isAdmin: true,
      },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    return {
      success: true,
      message: "Admin account created successfully",
      admin: newAdmin,
      token,
    };
  } catch (error) {
    console.error("Error creating admin account:", error);
    return {
      success: false,
      message: "Failed to create admin account",
    };
  }
}

/**
 * Login admin with email and password
 */
export async function loginAdmin(
  email: string,
  password: string,
): Promise<AdminLoginResponse> {
  try {
    const admin = await findAdminByEmail(email);

    if (!admin) {
      return {
        success: false,
        message: "Admin account not found",
      };
    }

    if (!admin.isActive) {
      return {
        success: false,
        message: "Admin account is inactive",
      };
    }

    // Get the admin with password hash
    const adminWithHash = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.email, email))
      .limit(1);

    if (!adminWithHash[0]) {
      return {
        success: false,
        message: "Admin account not found",
      };
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(
      password,
      adminWithHash[0].passwordHash,
    );

    if (!passwordMatch) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        isAdmin: true,
      },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    return {
      success: true,
      message: "Login successful",
      admin,
      token,
    };
  } catch (error) {
    console.error("Error logging in admin:", error);
    return {
      success: false,
      message: "Failed to login",
    };
  }
}

/**
 * Find admin by ID
 */
export async function findAdminById(id: string): Promise<AdminUser | null> {
  try {
    const admin = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.id, id))
      .limit(1);

    return admin[0] || null;
  } catch (error) {
    console.error("Error finding admin by ID:", error);
    return null;
  }
}
