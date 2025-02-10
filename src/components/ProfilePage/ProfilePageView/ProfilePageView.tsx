"use client";
import { Separator } from "@/components/ui/separator";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { TUserPayload } from "@/types/user.type";
import ProfileEditDialog from "../ProfileEditDialog/ProfileEditDialog";
import ProfileFollowToggle from "../ProfileFollowToggle/ProfileFollowToggle";
import { CalendarCheck, GlobeIcon, NotebookPen, UserCheck } from "lucide-react";
import ProfileLoadingSkeleton from "@/components/skeletons/ProfileLoadingSkeleton";
import CreatePost from "../CreatePost/CreatePost";
import GetUserProfilePost from "../GetUserProfilePost/GetUserProfilePost";
import { useState } from "react";

const ProfilePageView = () => {
  const { userId } = useParams();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);
  // console.log(userId);
  const {
    data: userProfileData,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfileQuery({ userId, token }, { skip: !userId || !token });
  //   console.log(userProfileData);

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

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (isError) {
    notFound();
  }

  return (
    <div className="w-full mt-[25px]">
      <div className="w-full aspect-[1640/400] bg-primaryMat/50 relative rounded-[8px] overflow-hidden">
        <Image
          src={"/images/default_cover.jpg"}
          width={1640}
          height={400}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex items-start justify-between px-[15px] pb-[15px] bg-white">
        <div className="flex items-start justify-start gap-[25px] relative">
          <div className="w-[80px] md:w-[100px] lg:w-[150px] aspect-square bg-primaryMat p-[5px] rounded-full center relative overflow-hidden top-[-20px] md:top-[-30px] lg:top-[-50px]">
            <Image
              className="w-full h-full rounded-full object-contain absolute top-0 left-0 z-[2]"
              src={"/images/avatar.jpg"}
              width={150}
              height={150}
              alt=""
            />
            <Image
              className="w-full h-full object-contain relative  z-[3]"
              src={userProfileData?.data?.image || "/images/avatar.jpg"}
              width={150}
              height={150}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <h1 className="text-[18px] lg:text-[25px] font-bold text-primaryTxt">
              {userProfileData?.data?.name}
            </h1>

            <div className="flex items-start justify-start  gap-[3px] md:gap-[10px] flex-row flex-wrap">
              <p className="text-primaryTxt text-[14px] sm:mb-[8px]">
                Joined on{" "}
                <span className="font-[700]">
                  {format(
                    userProfileData?.data?.createdAt || new Date(),
                    "MMM dd, yyyy"
                  )}
                </span>
              </p>
              <p className="center gap-[5px] font-[700] text-[14px] text-primaryTxt/70">
                <span className="">|</span>
                <span id={"follower_count_profile"}>
                  {userProfileData?.data?.totalFollower || 0}
                </span>{" "}
                followers <span>|</span>
              </p>
              <p className="center gap-[5px] font-[700] text-[14px] text-primaryTxt/70">
                {userProfileData?.data?.totalPost || 0} posts
              </p>
            </div>
          </div>
        </div>

        <div className="pt-[20px]">
          {user?.id === userId ? (
            <ProfileEditDialog />
          ) : (
            <ProfileFollowToggle
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
              updateFollowerCount={updateFollowerCount}
              refetch={refetch}
            />
          )}
        </div>
      </div>

      <Separator className="mt-[15px] mb-[25px] bg-input" />

      <div className="flex items-start justify-start gap-[15px] flex-col lg:flex-row">
        <div className="space-y-6  bg-white p-[15px] rounded-[18px] shrink-0 w-full lg:w-[440px]">
          <div className="mt-2 flex-col gap-[15px]">
            <p className="text-lg font-semibold">Profile Intro</p>
            <p className="text-muted-foreground text-[14px]">
              HI I&apos;m {userProfileData?.data?.name}. I am a travel
              enthusiast and love to explore new places.
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-[10px]">
            <p className="text-lg font-semibold mt-[5px]">Profile Summury</p>
            <p className="text-muted-foreground text-[14px] flex items-center gap-[5px]">
              <UserCheck className="w-[20px] h-[20px]" />{" "}
              <span>{userProfileData?.data?.totalFollower || 0} Followers</span>
            </p>
            <p className="text-muted-foreground text-[14px] flex items-center gap-[5px]">
              <NotebookPen className="w-[20px] h-[20px]" />{" "}
              <span>{userProfileData?.data?.totalPost || 0} Total Post</span>
            </p>
            <p className="text-muted-foreground text-[14px] flex items-center gap-[5px]">
              <CalendarCheck className="w-[20px] h-[20px]" />{" "}
              <span>
                Member Since{" "}
                {formatDistanceToNow(
                  userProfileData?.data?.createdAt || new Date()
                )}
              </span>
            </p>
          </div>
          <div className="mt-2 flex-col gap-[15px]">
            <div className="flex items-start justify-start gap-[8px]">
              <GlobeIcon />
              <p className="text-lg font-semibold">Public Profile</p>
            </div>
            <p className="text-muted-foreground text-[14px]">
              This profile is public. Anyone can see your posts, photos and your
              profile details. They can also see your stories.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[25px] w-full">
          <CreatePost />
          <GetUserProfilePost
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            updateFollowerCount={updateFollowerCount}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageView;
