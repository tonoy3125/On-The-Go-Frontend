"use client";
import MyFollowerSkeleton from "@/components/skeletons/MyFollowerSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetFollowersQuery } from "@/redux/features/follower/followerApi";
import Link from "next/link";


const MyFollowers = ({ heading = true }: { heading?: boolean }) => {
  const { data, isLoading } = useGetFollowersQuery({ page: 1, limit: 10 });

  return (
    <div>
      {heading ? <h2 className="font-semibold my-4">Followers</h2> : ""}

      <div className="flex flex-col gap-[15px]">
        {isLoading
          ? [...Array(4)].map((_, index) => <MyFollowerSkeleton key={index} />) // Show skeletons while loading
          : data?.data?.map(({ follower }) => (
              <Link
                key={follower._id}
                href={`/${follower._id}`}
                className="flex items-center w-full p-[10px] border-[1px] border-input rounded-[8px] bg-white"
              >
                <Avatar className="w-[35px] h-[35px] mr-2">
                  <AvatarImage
                    src={follower.image}
                    alt={follower.name}
                    className="border-[1px] border-input overflow-hidden"
                  />
                  <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-[12px] font-[600]">{follower.name}</span>
              </Link>
            ))}
      </div>

      {!isLoading && data?.data?.length === 0 && (
        <div>
          <p className="text-center text-[17px] font-[700]">No Follower</p>
          <p className="text-center text-[14px]">
            Upload your adventure post on the newsfeed to reach more followers
          </p>
        </div>
      )}
    </div>
  );
};

export default MyFollowers;
