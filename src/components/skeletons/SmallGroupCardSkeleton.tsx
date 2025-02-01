const SmallGroupCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse bg-muted/10">
      <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
      <div className="h-4 w-[250px] bg-muted animate-pulse rounded" />
    </div>
  );
};

export default SmallGroupCardSkeleton;
