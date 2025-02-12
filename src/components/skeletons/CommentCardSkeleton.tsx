import { Skeleton } from "@/components/ui/skeleton";
const CommentCardSkeleton = () => {
  return (
    <div className="flex space-x-3">
      <Skeleton className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <div className="bg-[#d4d4d4] rounded-lg p-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </div>
  );
};

export default CommentCardSkeleton;
