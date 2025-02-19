"use client";
import PostCard from "@/components/PostData/PostCard/PostCard";
import PostModal from "@/components/PostData/PostModal/PostModal";
import Pagination from "@/components/shared/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";

import { useState } from "react";
const CommunityPostView = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetAllPostsQuery({
    page,
    limit: 10,
  });
  return (
    <div>
      <Pagination
        className="mb-[10px]"
        meta={data?.meta?.total || 0}
        onPageChange={(page) => setPage(page)}
      />
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
        {data?.data?.map((post, i) => (
          <PostCard
            className="w-full"
            post={post}
            key={post._id}
            showFooterItems={false}
          >
            <div className="flex gap-[15px] w-full">
              {/* <DeleteCommunityPost id={post._id} /> */}
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
