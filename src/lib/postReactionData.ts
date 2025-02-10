import { TReactionType } from "@/types/reaction.type";

export const reactionData: {
  id: TReactionType;
  icon: string;
  background: string;
  color: string;
}[] = [
  {
    id: "like",
    icon: "/reactions/like.svg",
    color: "#0025ff",
    background: "#6ca4fe45",
  },
  {
    id: "love",
    icon: "/reactions/love.svg",
    color: "#ffd300",
    background: "#fee56c45",
  },
  {
    id: "haha",
    icon: "/reactions/haha.svg",
    color: "#ffd300",
    background: "#fee56c45",
  },
  {
    id: "sad",
    icon: "/reactions/sad.svg",
    color: "#ffd300",
    background: "#fee56c45",
  },
  {
    id: "angry",
    icon: "/reactions/angry.svg",
    color: "#ff3f00",
    background: "#ff770045",
  },
] as const;
