/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useAppDispatch, useAppSelector } from "@/redux/hook";

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
import {
  followUser,
  unfollowUser,
} from "@/redux/features/follower/followerSlice";
import { TFollower } from "@/types/follower.type";

type ProfileCardProps = {
  userData: TUser;
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  refetch: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  userData,
  isFollowing,
  setIsFollowing,
  refetch,
}) => {
  // const { userId } = useParams();
  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unFollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

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
      dispatch(
        followUser({
          authUserId: user?.id as string,
          targetUser: { _id: userData?._id, name: userData?.name } as TFollower, // Adjust target user data as needed
        })
      );

      toast.success(res?.data?.message || "Followed successfully");
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
      dispatch(
        unfollowUser({
          authUserId: user?.id as string,
          targetUserId: userData?._id,
        })
      );
      toast.success(res?.data?.message || "Unfollowed successfully");
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
        {!user || userData._id === user?.id ? null : (
          <div className="flex items-center gap-2">
            {isFollowing ? (
              <Button
                onClick={handleUnfollow}
                disabled={isUnfollowLoading}
                className="flex items-center justify-center gap-2"
              >
                {isUnfollowLoading ? (
                  <ImSpinner2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={handleFollow}
                disabled={isFollowLoading}
                className="flex items-center justify-center gap-2"
              >
                {isFollowLoading ? (
                  <ImSpinner2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                Follow
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const ProfileHoverCard = ({
  user,
  className,
  badgeWidth = 20,
  isFollowing,
  setIsFollowing,
  refetchData,
}: {
  user: TUser;
  badgeWidth?: number;
  className?: string;
  isFollowing?: boolean;
  setIsFollowing?: (value: boolean) => void;
  refetchData?: () => void;
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
        <ProfileCard
          isFollowing={isFollowing ?? false} // Ensures isFollowing is always boolean
          setIsFollowing={setIsFollowing as (value: boolean) => void} // Type assertion to avoid optional prop issue
          refetch={refetchData as () => void}
          userData={user}
        />
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileCard;
