import OntheGoTooltip from "@/components/shared/Tooltip/OntheGoTooltip";
import { reactionData } from "@/lib/postReactionData";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useChangeReactionMutation } from "@/redux/features/reaction/reactionApi";
import { useAppSelector } from "@/redux/hook";
import { IPost } from "@/types/post.types";
import { TReactionType } from "@/types/reaction.type";
import Image from "next/image";
import React, { useState } from "react";

interface IProps {
  post: IPost;
}

const PostReaction: React.FC<IProps> = ({ post }) => {
  const [reactedId, setReactedId] = useState<TReactionType | undefined>(
    post.reacted?.reactionId
  );
  const token = useAppSelector(useCurrentToken);

  const [totalReaction, setTotalReaction] = useState(post.reactionCount || 0);

  const { icon, id, color, background } =
    reactionData.find((react) => react.id == reactedId) || {};

  const [changeReaction] = useChangeReactionMutation();

  const [showReaction, setShowReaction] = useState(false);

  const handleChange = async (reactionId: TReactionType) => {
    const audio = new Audio();
    audio.src = "/audio/reaction.mp3";
    const payload = {
      postId: post._id,
      reaction: reactionId,
    };
    const isNew = reactedId !== reactionId;

    const newCount = isNew
      ? reactedId
        ? totalReaction
        : totalReaction + 1
      : totalReaction - 1;

    setReactedId(isNew ? reactionId : undefined);
    setTotalReaction(newCount);
    setShowReaction(false);

    isNew ? audio.play() : "";

    await changeReaction({ token, payload });
  };

  return (
    <div
      className="relative group/reaction select-none"
      onMouseEnter={() => setShowReaction(true)}
      onMouseLeave={() => setShowReaction(false)}
    >
      <button
        style={{
          color: color || "black",
          background: background,
          borderColor: background || "#ebebeb",
        }}
        className={`flex items-center justify-center gap-[15px] w-fit px-[10px] py-[3px] rounded-[8px] border-[1px] cursor-pointer`}
        onClick={() => handleChange(id || reactionData[0].id)}
      >
        {totalReaction || 0}
        {id && icon ? (
          <span className="flex items-center gap-[5px]">
            <Image src={icon} alt={id} width={20} height={20} />
            <span>{id}</span>
          </span>
        ) : (
          <span className="flex items-center gap-[5px]">
            <Image
              src={"/reactions/not_active.svg"}
              alt={"thumb"}
              width={20}
              height={20}
            />
            <span>Like</span>
          </span>
        )}
      </button>

      {showReaction ? (
        <div className="absolute bottom-[32px] left-0 pb-[10px]">
          <div
            className="rounded-[18px] bg-[#ececec] flex items-center justify-between py-[5px] px-[5px] gap-[5px] w-[200px] "
            style={{ transition: "0.3s" }}
          >
            {reactionData.map(({ icon, id }, i) => (
              <OntheGoTooltip key={i} message={id}>
                <button
                  onClick={() => handleChange(id)}
                  className="hover:scale-[1.3]"
                  style={{ transition: "0.3s" }}
                >
                  <Image
                    src={icon}
                    alt={id}
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] shrink-0"
                  />
                </button>
              </OntheGoTooltip>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostReaction;
