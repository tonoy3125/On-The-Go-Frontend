"use client";

import SmallGroupCardSkeleton from "@/components/skeletons/SmallGroupCardSkeleton";
import { Separator } from "@/components/ui/separator";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetFollowersQuery } from "@/redux/features/follower/followerApi";
import { useAppSelector } from "@/redux/hook";
import { TFollower } from "@/types/follower.type";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FollowersView = () => {
    const token = useAppSelector(useCurrentToken);
  const [query, setQuery] = useState({ page: 1, limit: 1 });
  const { data, isFetching } = useGetFollowersQuery({token,query});
  console.log('follower data',data);
  const [followerData, setFollowerData] = useState<TFollower[]>([]);

  useEffect(() => {
    if (data?.data) {
      const newFollower = data.data || [];
      setFollowerData([...followerData, ...newFollower]);
    }
  }, [data]);
  return (
    <div className="layout_container w-full bg-white">
      <div className="w-full max-w-[1200px] mx-auto min-h-screen  bg-white p-[15px] mt-[25px] rounded-[15px]">
        <h3 className="text-[25px] text-primaryTxt font-[700]">My Followers</h3>
        <Separator className="my-4" />
        <div className="flex flex-col gap-[15px]">
          {followerData.map((follower) => {
            return (
              <div
                key={follower._id}
                className="w-full flex flex-col gap-[15px]"
              >
                <div className="flex items-start justify-between gap-[15px]">
                  <div className="w-full flex items-center gap-[15px]">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <Image
                        src={follower?.follower?.image || "/images/avatar.jpg"}
                        width={50}
                        height={50}
                        alt={follower?.follower?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-[5px]">
                      <Link
                        href={`/${follower?.follower?._id}`}
                        className="flex items-start gap-[5px] hover:underline text-[15px] font-semibold"
                      >
                        {follower?.follower?.name}
                      </Link>
                      <span className="text-[13px] text-primaryMat font-[600]">
                        Since{" "}
                        {formatDistanceToNow(follower.createdAt || new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/${follower?.follower?._id}`}
                    className="shrink-0 text-primaryMat text-[14px] hover:underline"
                  >
                    View profile
                  </Link>
                </div>
                <Separator />
              </div>
            );
          })}
          {isFetching ? (
            <>
              <SmallGroupCardSkeleton />
              <SmallGroupCardSkeleton />
              <SmallGroupCardSkeleton />
            </>
          ) : (
            ""
          )}
          {!isFetching && followerData.length < (data?.meta?.total || 0) ? (
            <button
              onClick={() => setQuery({ ...query, page: query.page + 1 })}
              className="text-primaryMat text-[15px] hover:underline"
            >
              Load more
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersView;
