import { TCategories } from "./category.type";
import { TGroup } from "./group.type";
import { TReaction } from "./reaction.type";
import { TUser } from "./user.type";

interface IPostReqired {
  content: string;
  images: string[];
  premium: boolean;
}

export interface IPostCreate extends IPostReqired {
  categories: string[];
  group?: string;
}

export interface IPost extends IPostReqired {
  _id: string;
  categories: TCategories[];
  group?: TGroup;
  user: TUser;
  upvotes: string[];
  downvotes: string[];
  reactionCount: number;
  commentCount: number;
  reacted?: TReaction;
  createdAt: string;
  updatedAt: string;
}

export type TVoting = "upvote" | "downvote";
