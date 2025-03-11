/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import PostCard from "@/components/PostData/PostCard/PostCard";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import { Separator } from "@/components/ui/separator";
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";
import { IPost } from "@/types/post.types";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DisplayGroupPost = () => {
  const { groupId } = useParams();
  const [query, setQuery] = useState({ group: groupId, page: 1, limit: 10 });
  const { data, isFetching } = useGetAllPostsQuery(query);

  // console.log(data);

  const [postData, setPostData] = useState<IPost[]>([]);

  useEffect(() => {
    if (data?.data) {
      const newPostData = data.data || [];
      setPostData([...postData, ...newPostData]);
    }
  }, [data]);

  return (
    <div className="mt-[15px]">
      <h3 className="text-[25px] text-primaryTxt font-[700]">Group Post</h3>
      <Separator className="my-4" />
      {postData?.map((post) => (
        <PostCard post={post} key={post._id} groupView={true} refetch={function (): void {
          throw new Error("Function not implemented.");
        } } isFollowing={false} setIsFollowing={function (state: boolean): void {
          throw new Error("Function not implemented.");
        } } />
      ))}
      {!isFetching && !postData.length ? (
        <div className="w-full flex items-center justify-center bg-white py-[50px] rounded-[8px]">
          <h1 className="text-[25px] font-[700] flex items-center flex-col justify-center gap-[15px] text-center max-w-[700px]">
            <span className="w-[50px] aspect-square center bg-primaryMat/10 center rounded-full">
              <X className="w-[30px] h-[30px] text-primaryMat" />
            </span>{" "}
            This Group Has No Post yet or you may not have permission to see
            this group posts
          </h1>
        </div>
      ) : (
        ""
      )}
      {isFetching && (
        <div className="flex items-center justify-center flex-col mt-[10px]">
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

export default DisplayGroupPost;
