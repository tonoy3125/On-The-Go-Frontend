"use client";
import { useGetGroupsByUserIdQuery } from "@/redux/features/group/groupApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SmallGroupCardSkeleton from "../skeletons/SmallGroupCardSkeleton";
import { UsersRound } from "lucide-react";
import { TGroup } from "@/types/group.type";

const MyGroups = () => {
  const [query, setQuery] = useState({ page: 1, limit: 5 });
  const {
    data: groupData,
    isLoading,
    refetch,
  } = useGetGroupsByUserIdQuery(query);
  // console.log(groupData?.data?.result);

  // Auto refetch when query state changes
  useEffect(() => {
    refetch();
  }, [query, refetch]);

  return (
    <div className="w-full max-h-[350px] overflow-y-auto smoothBar">
      <div className="w-full flex items-start justify-between my-4">
        <h2 className="font-semibold">My Groups</h2>
        {!isLoading && groupData?.data.length ? (
          <button
            onClick={() =>
              setQuery({ ...query, limit: groupData?.data?.totalCount || 999 })
            }
            className="text-primaryMat text-[13px]"
          >
            See all
          </button>
        ) : (
          ""
        )}
      </div>
      {groupData?.data?.result?.length ? (
        <div className="flex flex-col gap-2">
          {groupData?.data?.result?.map((group: TGroup) => (
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
        <Link
          href="/group/create"
          className="w-fit px-[15px] py-[5px] center gap-[5px] bg-primaryMat/10 text-primaryMat rounded-[5px] border-[1px] border-primaryMat/20"
        >
          Create your first group <UsersRound width={15} />
        </Link>
      )}
    </div>
  );
};

export default MyGroups;
