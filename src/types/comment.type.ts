import { IPost } from "./post.types";
import { TUser } from "./user.type";

export type TComment = {
  _id: string;
  comment: string;
  post: IPost;
  user: TUser;
  createdAt: string;
};
