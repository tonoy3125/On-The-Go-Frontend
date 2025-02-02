/* eslint-disable @next/next/no-img-element */
"use client";
import Loader from "@/components/shared/Loader/Loader";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetGroupDetailsByIdQuery } from "@/redux/features/group/groupApi";
import { setGroupData } from "@/redux/features/group/groupSlice";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const groupNavigation = [
  {
    path: "about",
    label: "About",
  },
  {
    path: "post",
    label: "Post",
  },
  {
    path: "members",
    label: "Members",
  },
];

const GroupDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  const { groupId } = useParams();
  console.log(groupId);
  


  const dispatch = useDispatch();
  const token = useAppSelector(useCurrentToken);
  const path = usePathname();

  const { data: groupData, isLoading } = useGetGroupDetailsByIdQuery(
    { groupId, token },
  { skip: !groupId || !token }
  );
  console.log(groupData);

  useEffect(() => {
    if (groupData?.data?.group) {
      dispatch(setGroupData(groupData?.data?.group));
    }
  }, [groupData, dispatch]);

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }

  const group = groupData?.data?.group;
  const member = groupData?.data?.member;
  return (
    <div className="w-full py-6">
      <div className="overflow-hidden  text-card-foreground">
        <div className="relative">
        <img
            src={group?.image}
            alt={group?.name}
            className="h-[300px] w-full object-cover"
          />
          {groupData?.data?.member?.role === "owner" ||
          groupData?.data?.member?.role === "admin" ? (
            <>
              
            </>
          ) : (
            ""
          )}
        </div>

        <div className="py-6 bg-white px-6">
         

          
        </div>
        <div className="mt-[25px]">{children}</div>
      </div>
    </div>
  );
};

export default GroupDetailsLayout;
