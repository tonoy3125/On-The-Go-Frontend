/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import PostCard from "@/components/PostData/PostCard/PostCard";
import PostModal from "@/components/PostData/PostModal/PostModal";
import Pagination from "@/components/shared/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";

import { useState } from "react";
import DeleteCommunityPost from "../DeleteCommunityPost/DeleteCommunityPost";
const CommunityPostView = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const { data, refetch } = useGetAllPostsQuery(query);
  console.log(data?.meta);
  return (
    <div>
      <div className='mb-7'>
        <Pagination
          className="mb-[10px]"
          onPageChange={(page) => setQuery({ ...query, page })}
          meta={typeof data?.meta?.total === "number" ? data?.meta?.total : 0}
        />
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
        {data?.data?.map((post, i) => (
          <PostCard
            className="w-full"
            groupView={true}
            post={post}
            key={post._id}
            showFooterItems={false} refetch={function (): void {
              throw new Error("Function not implemented.");
            } } isFollowing={false} setIsFollowing={function (state: boolean): void {
              throw new Error("Function not implemented.");
            } }          >
            <div className="flex items-center gap-[15px] w-full">
              <button className="w-full">
                <DeleteCommunityPost refetch={refetch} id={post._id} />
              </button>
              <PostModal
                post={post}
                trigger={
                  <Button className="w-full" variant={"secondary"}>
                    View post
                  </Button>
                }
              />
            </div>
          </PostCard>
        ))}
      </div>
    </div>
  );
};

export default CommunityPostView;
