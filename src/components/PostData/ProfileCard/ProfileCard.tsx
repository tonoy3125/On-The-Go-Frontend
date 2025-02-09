/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useAppSelector } from "@/redux/hook";

import { BadgeCheck, CalendarDays, UserPlus } from "lucide-react";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

import { TUser, TUserPayload } from "@/types/user.type";
import {
  useFollowMutation,
  useUnFollowMutation,
} from "@/redux/features/follower/followerApi";
import OntheGoTooltip from "@/components/shared/Tooltip/OntheGoTooltip";
import { Button } from "@/components/ui/button";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { useParams } from "next/navigation";
import { useState } from "react";
const ProfileCard = ({ userData }: { userData: TUser }) => {
  const { userId } = useParams();
  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unFollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);

  // const following = useAppSelector((state) => state.followers.following);
  // console.log(following);

  // const isFollowing = following.find(
  //   (fol) => fol.following._id === userData._id
  // );

  const { data: userProfileData, refetch } = useGetUserProfileQuery(
    { userId, token },
    { skip: !userId || !token }
  );

  const isFollowingData = userProfileData?.data?.isFollowing || false;
  // console.log(isFollowing)
  const [isFollowing, setIsFollowing] = useState(isFollowingData);

  const updateFollowerCount = (change: number) => {
    const followerCountElement = document.getElementById(
      "follower_count_profile"
    ) as HTMLSpanElement | null;
    if (followerCountElement) {
      const newValue = Number(followerCountElement.innerText) + change;
      followerCountElement.innerText = String(newValue);
    }
  };

  const handleFollow = async () => {
    try {
      const payload = {
        following: userData?._id,
        follower: user?.id,
      };
      console.log("payload is", payload);
      const res = await follow({ token, payload }).unwrap();
      console.log("Follow Response", res);
      setIsFollowing(true);
      updateFollowerCount(1);
      toast.success(res?.message || "Followed successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  const handleUnfollow = async () => {
    try {
      const payload = {
        following: userData?._id,
        follower: user?.id,
      };
      console.log("payload is", payload);
      const res = await unFollow({ token, payload }).unwrap();
      console.log("UnFollow Response", res);
      setIsFollowing(false);
      updateFollowerCount(-1);
      toast.success(res?.message || "Unfollowed successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-start space-x-4">
      <Avatar>
        <AvatarImage src={userData.image} />
        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[10px]">
        <h4 className="text-sm font-semibold flex items-center gap-[10px]">
          <Link href={`/${userData._id}`} className="hover:underline">
            {userData.name}
          </Link>
          {userData.isPremium ? (
            <OntheGoTooltip message="Verified user">
              <BadgeCheck width={20} className="text-primaryMat" />
            </OntheGoTooltip>
          ) : (
            ""
          )}
        </h4>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
        {!user || userData._id === user?.id ? (
          ""
        ) : (
          <Button size="sm" onClick={handleFollow}>
            <UserPlus className="mr-2 h-4 w-4" />
            {isFollowing ? (
              <button onClick={handleUnfollow} disabled={isUnfollowLoading}>
                Unfollow
              </button>
            ) : (
              <button onClick={handleFollow} disabled={isFollowLoading}>
                Follow
              </button>
            )}
            {/* {isLoading ? <ImSpinner2 className="spinner" /> : ""} */}
          </Button>
        )}
      </div>
    </div>
  );
};

export const ProfileHoverCard = ({
  user,
  className,
  badgeWidth = 20,
}: {
  user: TUser;
  badgeWidth?: number;
  className?: string;
}) => {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-[10px]">
          <h3
            className={`font-semibold hover:underline cursor-pointer ${
              className || ""
            }`}
          >
            {user?.name}
          </h3>
          {user.isPremium ? (
            <OntheGoTooltip message="Verified user">
              <BadgeCheck width={badgeWidth} className="text-primaryMat" />
            </OntheGoTooltip>
          ) : (
            ""
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <ProfileCard userData={user} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileCard;
