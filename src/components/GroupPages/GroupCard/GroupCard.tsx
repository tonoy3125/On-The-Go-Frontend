/* eslint-disable @next/next/no-img-element */
"use client"
import GroupJoin from "@/components/GroupPage/GroupJoin/GroupJoin";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Users } from "lucide-react";


interface IProps {
  groupName: string;
  groupId: string;
  memberCount: number;
  groupImage: string;
  createdAt: string;
}

const GroupCard: React.FC<IProps> = ({
  groupId,
  groupName,
  memberCount,
  groupImage,
  createdAt,
}) => {
  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={groupImage}
          alt="Group of travelers in the mountains"
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="flex flex-col p-[10px]">
        <h3 className="text-xl font-bold">{groupName}</h3>
        <div className="flex items-center gap-2 text-sm my-[20px]">
          <Users className="h-4 w-4" />
          <span>{memberCount} members</span>
          <span>•</span>
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(createdAt), "MMM dd, yyyy")}</span>
        </div>
      </CardHeader>
      <CardFooter className="p-[10px]">
        <GroupJoin className="w-full" groupId={groupId} />
      </CardFooter>
    </Card>
  );
};

export default GroupCard;