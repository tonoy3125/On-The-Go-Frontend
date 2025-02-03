export type TRole = "user" | "admin";

// Define an interface for the user
export type TUser = {
  _id: string;
  email: string;
  name: string;
  role: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  isPremium: boolean;
  iat: number; // Issued at time (Unix timestamp)
  exp: number; // Expiration time (Unix timestamp)
};

// Define an interface for the payload
export type TUserPayload = {
  user: TUser;
  id: string;
};
