import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";


const GroupMemberSkeleton = () => {
  return (
    <div>
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-32 h-4 rounded-md" />
        <Skeleton className="w-48 h-3 rounded-md" />
      </div>
    </div>
    <Separator className="mt-[15px]" />
  </div>
  );
};

export default GroupMemberSkeleton;
