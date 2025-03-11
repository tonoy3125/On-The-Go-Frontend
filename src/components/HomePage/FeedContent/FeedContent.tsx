/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";
import { setPost } from "@/redux/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import NoPostFound from "../NoPostFound/NoPostFound";
import CreatePost from "@/components/ProfilePage/CreatePost/CreatePost";
import PostCard from "@/components/PostData/PostCard/PostCard";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";

const FeedContent = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken);
  const { data: posts } = useAppSelector((state) => state.post);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: userProfileData } = useGetUserProfileQuery(
    { userId, token },
    { skip: !userId || !token }
  );
  //   console.log(userProfileData);

  const isFollowingData = userProfileData?.data?.isFollowing || false;
  //   console.log(isFollowingData)
  const [isFollowing, setIsFollowing] = useState(isFollowingData);

  // Update isFollowing when userProfileData updates
  useEffect(() => {
    setIsFollowing(userProfileData?.data?.isFollowing || false);
  }, [userProfileData]);

  const { data, isLoading, isFetching, refetch } = useGetAllPostsQuery({
    page: searchParams.get("page") || 1,
    limit: 10,
    categories: searchParams.get("category") || "",
    searchTerm: searchParams.get("searchTerm") || "",
    premium: searchParams.get("premium") || "",
    sort: searchParams.get("sort") || "",
  });

  // Fetch posts and append to the list when data changes
  useEffect(() => {
    if (data?.data) {
      dispatch(setPost({ post: data.data, new: false }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    // remove all the query params from the url
    if (searchParams.get("page")) {
      router.push("/?page=1");
    }
  }, []);

  // Handler for loading the next page when the last post is in view
  const handleLoadMore = () => {
    if (!isFetching) {
      const params = new URLSearchParams(searchParams);
      const page = Number(searchParams.get("page") || 0) || 0;
      params.set("page", String(page + 1));
      router.push(`?${params.toString()}`);
    }
  };

  const Skeletons = (
    <>
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </>
  );

  if (isLoading)
    return (
      <div className="w-[100%] md:w-full lg:w-[50%] xl:w-[680px] shrink-0 h-full overflow-y-auto overflow-x-hidden smoothBar">
        {Skeletons}
      </div>
    );

  if (!posts.length && !isFetching) return <NoPostFound />;
  const more = (data?.meta?.total || 0) > posts.length ? true : false;

  return (
    <div className="h-full w-[100%] md:w-full lg:w-[50%] xl:w-[680px] shrink-0 overflow-y-auto overflow-x-hidden smoothBar">
      <div className="mb-[25px]">
        <CreatePost />
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={more}
        useWindow={false}
        loader={
          <div className="w-full">
            <PostCardSkeleton />
          </div>
        }
      >
        {posts.map((post, i) => {
          return (
            <PostCard
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
              refetch={refetch}
              post={post}
              key={post._id}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default FeedContent;
