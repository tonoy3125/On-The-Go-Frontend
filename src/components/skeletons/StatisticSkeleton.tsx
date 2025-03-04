import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const StatisticSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <CardTitle>
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-between items-end space-x-2">
          <Skeleton className="h-32 w-1/4" />
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-24 w-1/4" />
          <Skeleton className="h-20 w-1/4" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticSkeleton;
