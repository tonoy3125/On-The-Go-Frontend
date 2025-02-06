const ProfileLoadingSkeleton = () => {
  return (
    <div className="w-full">
      {/* Header Image Skeleton */}
      <div className="w-full h-[300px] bg-gray-200 animate-pulse" />

      <div className="w-full  px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className="relative -mt-16 sm:-mt-24">
          {/* Avatar Skeleton */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 animate-pulse border-4 border-white" />

          {/* Profile Info Skeleton */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-72 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="h-10 w-28 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 animate-pulse rounded" />
            <div className="h-20 bg-gray-200 animate-pulse rounded" />
            <div className="h-20 bg-gray-200 animate-pulse rounded hidden sm:block" />
          </div>

          {/* Content Sections Skeleton */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              <div className="h-40 bg-gray-200 animate-pulse rounded" />
              <div className="h-60 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-4">
              <div className="h-40 bg-gray-200 animate-pulse rounded" />
              <div className="h-40 bg-gray-200 animate-pulse rounded" />
              <div className="h-40 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingSkeleton;
