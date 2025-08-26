export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

export interface AuthSession {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  user: AuthUser;
}

export type AuthResponse = {
  data: AuthSession | null;
  error?: {
    message: string;
    code: string;
  };
};