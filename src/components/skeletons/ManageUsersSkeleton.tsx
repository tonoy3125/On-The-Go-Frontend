import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const ManageUsersSkeleton = () => {
  return (
    <div>
      <Card className="animate-pulse">
        <div className="flex items-center gap-4 p-4">
          {/* Avatar Skeleton */}
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="w-full">
            <div className="flex items-center justify-start gap-[10px]">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-48 mt-2" />
            <Skeleton className="h-4 w-40 mt-2" />
          </div>
        </div>

        <Separator />

        <CardContent className="p-4">
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersSkeleton;
