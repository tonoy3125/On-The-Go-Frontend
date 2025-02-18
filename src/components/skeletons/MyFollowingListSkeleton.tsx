const MyFollowingListSkeleton = () => {
  return (
    <div className="flex items-start mb-4 w-full p-[10px] border-[1px] border-input rounded-[8px] bg-white animate-pulse">
      <div className="w-[45px] h-[45px] bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col gap-1 justify-start items-start w-full">
        <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-20 h-6 bg-gray-300 rounded-md mt-1"></div>
      </div>
    </div>
  );
};

export default MyFollowingListSkeleton;
