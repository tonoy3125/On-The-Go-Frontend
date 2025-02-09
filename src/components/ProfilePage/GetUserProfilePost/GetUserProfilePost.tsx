import PostCard from "@/components/PostData/PostCard/PostCard";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import { Separator } from "@/components/ui/separator";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetUserProfilePostQuery } from "@/redux/features/post/postApi";
import { useAppSelector } from "@/redux/hook";
import { IPost } from "@/types/post.types";
import { TUserPayload } from "@/types/user.type";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const GetUserProfilePost = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken);
  const [query, setQuery] = useState({ page: 1, limit: 5 });
  const { data, isFetching, refetch } = useGetUserProfilePostQuery({
    userId,
    ...query,
    token,
  });

  console.log(data);

  const [postData, setPostData] = useState<IPost[]>([]);

  useEffect(() => {
    refetch(); // Auto refetch when userId or query changes
  }, [userId, query, refetch]);

  useEffect(() => {
    if (data?.data) {
      const newPostData = data.data || [];
      setPostData([...postData, ...newPostData]);
    }
  }, [data]);

  return (
    <div className="w-full">
      <h3 className="text-[25px] text-primaryTxt font-[700]">Profile Post</h3>
      <Separator className="my-4 bg-input" />

      {!isFetching && !postData.length ? (
        <div className="w-full flex items-center justify-center bg-white py-[50px] rounded-[8px]">
          <h1 className="text-[25px] font-[700] flex items-center flex-col justify-center gap-[15px]">
            <span className="w-[50px] aspect-square center bg-primaryMat/10 center rounded-full">
              <X className="w-[30px] h-[30px] text-primaryMat" />
            </span>{" "}
            This Profile Has No Post yet
          </h1>
        </div>
      ) : (
        ""
      )}

      {postData?.map((post) => (
        <PostCard
          post={post}
          key={post._id}
          groupView={true}
          refetch={refetch}
        />
      ))}

      {isFetching && (
        <div className="flex items-center justify-center flex-col mt-[10px] w-full">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      )}
      {!isFetching && postData.length < (data?.meta?.total || 0) ? (
        <button
          onClick={() => setQuery({ ...query, page: query.page + 1 })}
          className="w-fit mt-[20px] mx-auto text-[15px] font-[700] text-primaryMat hover:underline center"
        >
          Load More
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default GetUserProfilePost;
