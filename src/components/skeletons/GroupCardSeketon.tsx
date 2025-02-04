import { Card, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const GroupCardSeketon = () => {
  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-48 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default GroupCardSeketon;
