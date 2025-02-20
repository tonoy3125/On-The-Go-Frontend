"use client";

import Pagination from "@/components/shared/Pagination/Pagination";
import OntheGoTooltip from "@/components/shared/Tooltip/OntheGoTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { formatDistanceToNow } from "date-fns";
import { BadgeCheck, ListOrderedIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

const ManageUserView = () => {
  const [page, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: userData } = useGetAllUsersQuery({ searchTerm, page, limit });
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user roles and permissions.
        </p>
      </div>

      <div className="w-full flex items-center justify-between my-6">
        <form
          className="flex w-[350px]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            setSearchTerm(form.search.value);
          }}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 text-muted-foreground w-auto" />
            </div>
            <Input
              type="search"
              name="search"
              onBlur={(e) => setSearchTerm(e.target.value)}
              placeholder="email or last name or first.."
              className="block w-full p-4 pl-10 text-sm text-foreground bg-background border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <Button type="submit" variant="secondary" className="ml-[10px]">
            Search
          </Button>
        </form>
        <div className="center gap-[20px]">
          <Select onValueChange={(e) => setLimit(Number(e))}>
            <SelectTrigger className="">
              <ListOrderedIcon className="h-4 w-4" />
              <SelectValue placeholder="Limit per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Content limit</SelectLabel>

                <SelectItem value="10">Limit: 10</SelectItem>
                <SelectItem value="20">Limit: 20</SelectItem>
                <SelectItem value="30">Limit: 30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {userData?.data && userData.data.length < 1 ? "<NotFound />" : ""}

      <div className="gap-4 gridUser_responsive">
        {userData?.data?.map((pay_user) => (
          <Card key={pay_user._id}>
            <div className="flex items-center gap-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={pay_user?.image} alt="John Doe" />
                <AvatarFallback>{pay_user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center justify-start gap-[10px]">
                  <h1 className="font-medium">{pay_user.name}</h1>
                  {pay_user.isPremium ? (
                    <OntheGoTooltip message="Verified user">
                      <BadgeCheck width={20} className="text-primaryMat" />
                    </OntheGoTooltip>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {pay_user.email}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member since{" "}
                  {formatDistanceToNow(new Date(pay_user.createdAt), {
                    addSuffix: false,
                  })}
                </div>
              </div>
            </div>
            <Separator />
            {/* <CardContent className="p-4">
              <ChangeUserRole
                id={pay_user._id}
                role={pay_user.auth?.role || ""}
              />
            </CardContent> */}
          </Card>
        ))}
      </div>

      <Pagination
        meta={userData?.meta?.total || 0}
        limit={limit}
        onPageChange={(page) => setCurrentPage(page)}
        className="mt-4"
      />
    </div>
  );
};

export default ManageUserView;
