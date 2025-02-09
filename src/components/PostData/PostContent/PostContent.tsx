"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader } from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ProfileHoverCard } from "../ProfileCard/ProfileCard";
import PostOptions from "../PostOptions/PostOptions";
import PostGallery from "../PostGallery/PostGallery";
import { IPost } from "@/types/post.types";

const PostContent = ({
  post,
  groupView,
  refetch,
}: {
  post: IPost;
  groupView?: boolean;
  refetch: () => void;
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between">
        {groupView ? (
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-4 border-[1px] border-secondary">
              <AvatarImage src={post?.user?.image} alt={post?.user?.name} />
              <AvatarFallback>{post?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <ProfileHoverCard user={post.user} />
              <p className="text-sm text-gray-500">
                {format(post.createdAt, "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        ) : post.group ? (
          <div className="relative z-[1] flex items-start justify-start gap-[15px]">
            <div className="relative w-[40px] h-[40px] rounded-[8px]">
              <Image
                src={post.group.image || "/images/travelGroup.png"}
                alt={post.group.name}
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-[8px] relative z-[1]"
              />
              <Image
                src={post.user?.image || "/images/avatar.jpg"}
                alt=""
                width={25}
                height={25}
                className="absolute bottom-[-5px] right-[-5px] z-[2] rounded-full border-[1px] border-borderColor"
              />
            </div>
            <div className="flex flex-col gap-[0px]">
              <Link
                href={`/group/${post.group._id}/post`}
                className="font-semibold text-[18px] hover:underline cursor-pointer leading-[100%]"
              >
                {post.group.name}
              </Link>
              <div className="flex items-center gap-[5px]">
                <ProfileHoverCard
                  badgeWidth={15}
                  user={post.user}
                  className="!font-[400] !text-primaryTxt/50 leading-[100%] !text-[13px]"
                />
                <p className="text-[12px] text-gray-500">
                  {formatDistanceToNow(post.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-4 border-[1px] border-secondary">
              <AvatarImage src={post.user?.image} alt={post.user?.name} />
              <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <ProfileHoverCard user={post.user} />
              <p className="text-sm text-gray-500">
                {format(post.createdAt, "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        )}
        <PostOptions refetch={refetch} post={post} />
      </CardHeader>
      <CardContent>
        {post.premium ? (
          <Badge
            variant="secondary"
            className="mb-2 bg-yellow-400 text-yellow-800"
          >
            <Crown className="w-3 h-3 mr-1 " />
            Premium Content
          </Badge>
        ) : (
          ""
        )}

        <div className="relative">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="mb-4 reset-all relative z-[1]"
            style={{
              maxHeight: showFullContent ? "auto" : "150px",
              overflow: "hidden",
            }}
            ref={containerRef}
          />

          {!showFullContent &&
          containerRef?.current?.scrollHeight &&
          containerRef?.current?.scrollHeight > 150 ? (
            <span
              className="absolute hideGradient center h-[50px] w-full bottom-0 left-0 z-[2] cursor-pointer"
              onClick={() => setShowFullContent(true)}
            >
              read more
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-start items-center gap-[10px] mb-2">
          {post.categories?.map(({ name }) => (
            <Badge key={post._id + "-" + name} variant="outline">
              {name}
            </Badge>
          ))}
        </div>
        {post.images.length > 0 && (
          <PostGallery images={post.images} postId={post._id} />
        )}
      </CardContent>
    </>
  );
};

export default PostContent;
