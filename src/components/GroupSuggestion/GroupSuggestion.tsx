import { useGetGroupsSuggestionByUserIdQuery } from "@/redux/features/group/groupApi";
import Image from "next/image";
import Link from "next/link";
import SmallGroupCardSkeleton from "../skeletons/SmallGroupCardSkeleton";
import { TGroup } from "@/types/group.type";

const GroupSuggestion = () => {
  const { data: groupSuggestionData, isLoading } =
    useGetGroupsSuggestionByUserIdQuery({
      page: 1,
      limit: 5,
    });
  console.log(groupSuggestionData);
  return (
    <div className="w-full max-h-[350px] overflow-y-auto smoothBar">
      <div className="flex items-start justify-between">
        <h2 className="font-semibold">Groups you may like</h2>
        <Link
          href="/group"
          className="text-primaryMat text-[13px] hover:underline"
        >
          View more
        </Link>
      </div>
      {groupSuggestionData?.data?.length ? (
        <div className="flex flex-col gap-2 mt-[15px]">
          {groupSuggestionData?.data?.map((group: TGroup) => (
            <Link
              href={`/group/${group._id}`}
              key={group._id}
              className="flex items-center justify-start w-full gap-[8px] hover:bg-primaryMat/5 p-[5px] rounded-[8px] cursor-pointer"
            >
              <span className="w-[40px] h-[40px] rounded-[8px] overflow-hidden">
                <Image
                  alt={group.name}
                  src={group.image}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="text-[14px] font-[600] text-primaryTxt line-clamp-1">
                {group.name || "N/A"}
              </span>
            </Link>
          ))}
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-2 bg-white p-[15px]">
          <SmallGroupCardSkeleton />
          <SmallGroupCardSkeleton />
          <SmallGroupCardSkeleton />
          <SmallGroupCardSkeleton />
        </div>
      ) : (
        "You don't have any groups to join 🔥"
      )}
    </div>
  );
};

export default GroupSuggestion;
