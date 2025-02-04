import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TRole = "user" | "admin";

// Define an interface for the user
export type TUser = {
  _id: string;
  email: string;
  name: string;
  role: string;
  phone: number;
  image: string;
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

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
