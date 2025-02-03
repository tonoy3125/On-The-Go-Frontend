"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hook";

const GroupPageAboutLayout = () => {
  const { group } = useAppSelector((state) => state.group);
//   console.log(group);
  if (!group) {
    return <></>;
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">About this group</h2>
        <p className="mt-2 text-muted-foreground">{group?.description}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Admin</h2>
        <div className="mt-2 flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={group?.GroupOwner?.image || "/images/avatar.jpg"}
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
  );
};

export default GroupPageAboutLayout;
