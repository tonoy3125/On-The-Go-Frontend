import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TComment } from "@/types/comment.type";
import { TUserPayload } from "@/types/user.type";

import { format } from "date-fns";
import React from "react";
import CommentDelete from "../CommentDelete/CommentDelete";
import CommentUpdate from "../CommentUpdate/CommentUpdate";

interface IPorps {
  comment: TComment;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  refetchComment: () => void;
}

const CommentCard: React.FC<IPorps> = ({ comment, setPage }) => {
  const userData = useAppSelector(selectCurrentUser) as TUserPayload | null;
  // console.log(userData);

  return (
    <div className="flex space-x-3">
      <Avatar className="w-8 h-8">
        <AvatarImage alt={comment?.user.name} src={comment?.user.image} />
        <AvatarFallback>{comment?.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-[#f1f1f1] rounded-lg p-3">
          <div className="flex flex-col">
            <span className="font-semibold">{comment?.user.name}</span>
            <span className="font-[400] text-[12px]">
              {format(comment?.createdAt, "MMM dd, yyyy")}
            </span>
          </div>
          <p className="mt-3 text-sm">{comment?.comment}</p>
        </div>
        {userData && userData.id === comment?.user._id && (
          <div className="flex items-center justify-start gap-[10px] mt-[10px]">
            <CommentDelete comment={comment} setPage={setPage} />
            <CommentUpdate comment={comment} setPage={setPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
