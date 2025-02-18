/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFollowingListSkeleton from "@/components/skeletons/MyFollowingListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  useGetFollowingsQuery,
  useUnFollowMutation,
} from "@/redux/features/follower/followerApi";
import { unfollowUser } from "@/redux/features/follower/followerSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

const MyFollowingList = ({ heading = true }: { heading?: boolean }) => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const { data: userProfileData, refetch: refetchUserProfile } =
    useGetUserProfileQuery({ userId, token }, { skip: !userId || !token });

  const isFollowingData = userProfileData?.data?.isFollowing || false;
  const [isFollowing, setIsFollowing] = useState(isFollowingData);

  useEffect(() => {
    setIsFollowing(userProfileData?.data?.isFollowing || false);
  }, [userProfileData]);

  const {
    data: followingList,
    refetch: refetchFollowings,
    isLoading,
  } = useGetFollowingsQuery({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (userId && token) {
      refetchFollowings();
      refetchUserProfile();
    }
  }, [userId, token, refetchFollowings, refetchUserProfile]);

  const [unFollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();

  const handleUnfollow = async (targetUserId: string) => {
    try {
      const payload = { following: targetUserId, follower: userId };
      const res = await unFollow({ token, payload }).unwrap();
      setIsFollowing(false);
      dispatch(unfollowUser({ authUserId: userId, targetUserId }));
      toast.success(res?.message || "Unfollowed successfully");
      await refetchFollowings();
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      {heading && <h2 className="font-semibold my-4">Following</h2>}

      {/* Show Skeleton if data is loading */}
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <MyFollowingListSkeleton key={i} />
        ))
      ) : followingList?.data?.length ? (
        followingList.data.map((user) => (
          <div
            key={user._id}
            className="flex items-start mb-4 w-full p-[10px] border-[1px] border-input rounded-[8px] bg-white"
          >
            <Avatar className="w-[45px] h-[45px] mr-2">
              <AvatarImage
                src={user?.following?.image}
                alt={user.name}
                className="border-[1px] border-input overflow-hidden"
              />
              <AvatarFallback>{user?.following?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-[14px] font-[600]">
                {user?.following?.name}
              </span>
              <Button
                className="text-[12px] underline hover:italic flex items-center justify-center gap-2 border"
                onClick={() => handleUnfollow(user.following._id)}
                disabled={isUnfollowLoading}
              >
                {isUnfollowLoading ? (
                  <ImSpinner2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                UnFollow
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p className="text-[17px] font-[700]">No Following</p>
          <p className="text-[14px]">
            Explore more content on the news feed and follow others to get
            connected.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyFollowingList;
