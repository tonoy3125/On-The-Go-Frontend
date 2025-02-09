"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetGroupMemberByGroupIdQuery } from "@/redux/features/group/groupApi";
import { useAppSelector } from "@/redux/hook";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { TMember } from "@/types/group.type";
import GroupMemberSkeleton from "@/components/skeletons/GroupMemberSkeleton";
import Link from "next/link";

const GroupPageMemberLayout = () => {
  const { groupId } = useParams();
  const token = useAppSelector(useCurrentToken);

  const { data: groupMemberData, isLoading } = useGetGroupMemberByGroupIdQuery(
    { groupId, token },
    { skip: !groupId || !token }
  );
  // console.log(groupMemberData);

  const members = groupMemberData?.data || [];
  const skeletonCount = groupMemberData?.data?.length ?? 3;
  // console.log(skeletonCount)

  return (
    <div className="flex flex-col gap-[15px] bg-white w-full rounded-[8px] p-[15px]">
      <h1 className="text-lg font-semibold">Group Members</h1>
      <div className="flex flex-col gap-[15px]">
        {isLoading
          ? // Show skeleton for each expected member, fallback to 3
            [...Array(skeletonCount)].map((_, index) => (
              <GroupMemberSkeleton key={index} />
            ))
          : members.map((member: TMember) => {
              const roleText =
                member?.role === "admin"
                  ? "Group Admin"
                  : member?.role === "owner"
                  ? "Group Owner"
                  : "Member";
              return (
                <div key={member._id}>
                  <Link href={`/${member?.user?._id}`} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={member?.user.image || "/images/avatar.jpg"}
                        alt={member?.user?.name}
                      />
                      <AvatarFallback>{member?.user?.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member?.user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {roleText} · Joined{" "}
                        {format(
                          member?.createdAt || new Date(),
                          "MMM dd, yyyy"
                        )}
                      </p>
                    </div>
                  </Link>
                  <Separator className="mt-[15px]" />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default GroupPageMemberLayout;
