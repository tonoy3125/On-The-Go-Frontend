"use client";
import CreatePost from "@/components/ProfilePage/CreatePost/CreatePost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hook";
import { GlobeIcon, LockIcon } from "lucide-react";
import DisplayGroupPost from "../DisplayGroupPost/DisplayGroupPost";

const GroupPostView = () => {
  const { group } = useAppSelector((state) => state.group);

  return (
    <div className="flex items-start justify-start flex-col-reverse lg:flex-row gap-[15px]">
      <div className="w-full">
        <CreatePost />
        <DisplayGroupPost />
      </div>
      <div className="space-y-6  bg-white p-[15px] rounded-[18px] w-full lg:w-[440px] shrink-0">
        <div>
          <h2 className="text-lg font-semibold">About this group</h2>
          <p className="mt-2 text-primaryTxt">{group?.description}</p>
        </div>
        <div className="mt-2 flex-col gap-[15px]">
          <div className="flex items-start justify-start gap-[8px]">
            {group?.privacy === "private" ? <LockIcon /> : <GlobeIcon />}
            <p className="text-lg font-semibold">
              {group?.privacy === "private" ? "Private" : "Public"}
            </p>
          </div>
          <p className="text-muted-foreground text-[14px]">
            {group?.privacy === "private"
              ? "This group is private. Only invited members can see the group's posts and other details about the group. but people still find the group and can join."
              : "This group is public. Anyone can see the group's posts. But you have to be a member to post on this group."}
          </p>
        </div>
        <div className="w-[300px] shrink-0 sticky top-0">
          <h2 className="text-lg font-semibold">Admin</h2>
          <div className="mt-2 flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={group?.GroupOwner?.image}
                alt={group?.GroupOwner?.name}
              />
              <AvatarFallback>{group?.GroupOwner?.name}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{group?.GroupOwner?.name}</p>
              <p className="text-sm text-muted-foreground">Group Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPostView;
