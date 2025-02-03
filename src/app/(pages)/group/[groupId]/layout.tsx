/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetGroupDetailsByIdQuery,
  useUpdateGroupByGroupIdMutation,
} from "@/redux/features/group/groupApi";
import { setGroupData } from "@/redux/features/group/groupSlice";
import { useAppSelector } from "@/redux/hook";
import { upLoadSingeImage } from "@/utils/uploadSingleImage";
import { Calendar, Camera, Globe, Lock, Users } from "lucide-react";
import { format } from "date-fns";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import GroupEdit from "@/components/GroupPage/GroupEdit/GroupEdit";
import GroupJoin from "@/components/GroupPage/GroupJoin/GroupJoin";

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
  // console.log(groupData);
  const [updateGroupByGroupId] = useUpdateGroupByGroupIdMutation();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) {
      return;
    }
    const toastId = toast.loading("Uploading image...");
    try {
      const { data } = await upLoadSingeImage(file, token || "");
      console.log(data);

      if (data) {
        const payload = {
          image: data,
        };
        console.log(payload);
        await updateGroupByGroupId({
          groupId: groupId,
          payload,
          token,
        });
        // console.log(res);
        toast.success("Image Uploaded Successfully!!", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

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
              <Button
                variant="secondary"
                className="absolute bottom-4 right-4"
                onClick={() => document.getElementById("cover-upload")?.click()}
              >
                <Camera className="mr-2 h-4 w-4" />
                Change Cover
              </Button>
              <input
                id="cover-upload"
                onChange={handleImageUpload}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </>
          ) : (
            ""
          )}
        </div>

        <div className="py-6 bg-white px-6">
          <div className="flex items-start justify-between flex-col md:flex-row gap-[15px]">
            <div>
              <h1 className="text-3xl font-bold">{group?.name}</h1>
              <div className="mt-2 flex items-center gap-1 sm:gap-2 text-muted-foreground text-[12px] sm:text-[14px]">
                {group?.privacy === "public" ? (
                  <Globe className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
                <span className="capitalize">{group?.privacy} group</span>
                <span>·</span>
                <Users className="h-4 w-4" />
                <span>
                  {group?.memberCount} member
                  {group?.memberCount !== 1 ? "s" : ""}
                </span>
                <span>·</span>
                <Calendar className="h-4 w-4" />
                <span>
                  {format(group?.createdAt || new Date(), "MMM dd, yyyy")}
                </span>
              </div>
            </div>

            {groupData?.data?.member?.role === "owner" ||
            groupData?.data?.member?.role === "admin" ? (
              <GroupEdit groupData={groupData} />
            ) : (
              ""
            )}

            {!member && <GroupJoin groupId={groupId as string} />}
          </div>

          {/* <div className=" flex items-center justify-start mt-[25px] h-[40px] bg-primaryMat/10 px-3 rounded-[8px]">
            {group?.privacy === "public" ? (
              <>
                {groupNavigation.map((item, i) => {
                  const url = `/group/${groupId}/${item.path}`;
                  return (
                    <Link
                      key={i + item.path}
                      href={url}
                      className={`px-[25px] py-[8px] relative rounded-[0px] ${
                        path === url
                          ? "text-primaryMat after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primaryMat"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </>
            ) : member ? (
              <>
                {groupNavigation.map((item, i) => {
                  const url = `/group/${groupId}/${item.path}`;
                  return (
                    <Link
                      key={i + item.path}
                      href={url}
                      className={`px-[25px] py-[8px] relative rounded-[0px] ${
                        path === url
                          ? "text-primaryMat after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primaryMat"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </>
            ) : (
              <>
                {groupNavigation.map((item, i) => {
                  const url = `/group/${groupId}/${item.path}`;
                  return (
                    <Link
                      key={i + item.path}
                      href={url}
                      onClick={(e) => e.preventDefault()}
                      className={`px-[25px] py-[8px] relative rounded-[0px] cursor-not-allowed ${
                        path === url
                          ? "text-primaryMat after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primaryMat"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </>
            )}
          </div> */}
          {/* <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={member?.user.image}
                  alt={`${member?.user.firstName} ${member?.user.lastName}`}
                />
                <AvatarFallback>
                  {member?.user.firstName[0]}
                  {member?.user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {member?.user.firstName} {member?.user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Group Admin · Joined{" "}
                  {format(member?.createdAt || new Date(), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <div className="mt-[25px]">{children}</div>
      </div>
    </div>
  );
};

export default GroupDetailsLayout;
