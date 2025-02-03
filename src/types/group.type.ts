import { TUser } from "./user.type";

export type TGroup = {
  _id: string;
  name: string;
  description: string;
  image: string;
  privacy: TGroupPrivacy;
  memberCount: number;
  GroupOwner: TUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TGroupDetails = {
  group: TGroup;
  member: TMember;
};

export type TGroupOwner = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isPremium: boolean;
};

export type TMember = {
  _id: string;
  user: TUserGroup;
  group: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TUserGroup = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isPremium: boolean;
};

export type TGroupPrivacy = "public" | "private";
