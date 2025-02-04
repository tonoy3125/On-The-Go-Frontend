"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetGroupsSuggestionByUserIdQuery } from "@/redux/features/group/groupApi";
import { FilterX, SearchIcon, Users } from "lucide-react";
import { useState } from "react";
import GroupCard from "../GroupCard/GroupCard";
import GroupCardSeketon from "@/components/skeletons/GroupCardSeketon";
import Pagination from "@/components/shared/Pagination/Pagination";
import Link from "next/link";

const Groups = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10, searchTerm: "" });
  const {
    data: groupSuggestionData,
    refetch,
    isFetching,
  } = useGetGroupsSuggestionByUserIdQuery(query);
  // console.log(groupSuggestionData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const search = form.search?.value || "";
    setQuery({ ...query, searchTerm: search, page: 1 });
  };

  return (
    <div className="my-[25px] bg-white min-h-screen p-[20px] rounded-[15px]">
      <h3 className="text-[25px] text-primaryTxt font-[700]">
        Sugested Groups
      </h3>
      <p>
        Suggested group for you. Groups that you may like to join and share your
        travel stories
      </p>
      <Separator className="my-4" />
      <div className="w-full flex items-start sm:items-center justify-between gap-[15px] flex-col sm:flex-row my-[15px]">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] sm:w-[350px] h-[40px] border-[1px] border-input rounded-full pl-[10px] flex items-center justify-between overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search groups"
            name="search"
            id="search"
            className="w-full h-full outline-none bg-transparent border-transparent"
          />
          <button className="h-full px-[15px] center bg-primaryMat/20">
            <SearchIcon className="shrink-0 text-primaryMat" />
          </button>
        </form>
        <Link
          href="/group/create"
          className="bg-primaryMat/10 text-primaryMat center gap-[15px] hover:bg-primaryMat hover:text-white px-[15px] py-[8px] rounded-[8px]"
        >
          Create Group <Users />
        </Link>
      </div>

      {!isFetching && !groupSuggestionData?.data?.length ? (
        <div className="space-y-2 w-full center flex-col h-[350px]">
          <div className="w-[50px] h-[50px] rounded-full center bg-primaryMat/10 ">
            <Users className="h-6 w-6 text-primaryMat" />
          </div>
          <h3 className="text-xl font-semibold">No Travel Groups Found</h3>
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t find any travel groups matching your criteria.
          </p>
          <Button
            onClick={() => {
              setQuery({ ...query, searchTerm: "", page: 1 });
              const searchFeild = document.getElementById(
                "search"
              ) as HTMLInputElement;
              if (searchFeild) {
                searchFeild.value = "";
              }
            }}
            className="mt-4 bg-primaryMat/10 text-primaryMat center gap-[15px] hover:bg-primaryMat hover:text-white"
          >
            Clear Filters <FilterX />
          </Button>
        </div>
      ) : (
        ""
      )}

      <div className="w-full gridGroup_responsive gap-[18px]">
        {isFetching ? (
          <>
            <GroupCardSeketon />
            <GroupCardSeketon />
            <GroupCardSeketon />
            <GroupCardSeketon />
          </>
        ) : (
          groupSuggestionData?.data?.map((group) => (
            <GroupCard
              key={group._id}
              groupId={group._id}
              groupName={group.name}
              memberCount={group.memberCount}
              groupImage={group.image}
              createdAt={group.createdAt}
            />
          ))
        )}
      </div>

      <Pagination
        onPageChange={(page) => setQuery({ ...query, page })}
        meta={typeof groupSuggestionData?.meta === "number" ? groupSuggestionData.meta : 0}
      />
    </div>
  );
};

export default Groups;
