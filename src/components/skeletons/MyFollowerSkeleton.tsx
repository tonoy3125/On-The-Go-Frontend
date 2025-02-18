const MyFollowerSkeleton = () => {
  return (
    <div className="flex items-center w-full p-[10px] border-[1px] border-input rounded-[8px] bg-white animate-pulse">
      <div className="w-[35px] h-[35px] rounded-full bg-gray-300 mr-2"></div>
      <div className="h-[14px] w-[100px] bg-gray-300 rounded"></div>
    </div>
  );
};

export default MyFollowerSkeleton;
