import { TUser } from "./user.type";

export type TFollower = {
  _id: string;
  following: TUser;
  follower: TUser;
  createdAt: string;
};
