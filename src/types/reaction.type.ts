import { IPost } from "./post.types";

export type TReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

export type TReaction = {
  reactionId: TReactionType;
  post?: IPost;
  user?: IPost;
  createdAt: string;
  updatedAt: string;
};
