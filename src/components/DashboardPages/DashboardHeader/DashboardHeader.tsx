import { ISideBarState } from "@/app/(dashboard)/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TUserPayload } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ThemeChanger from "../ThemeChanger/ThemeChanger";

const DashboardHeader: React.FC<ISideBarState> = ({ setIsOpen }) => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  return (
    <div className="w-full flex items-center justify-between px-[20px]  py-[10px] shrink-0 bg-card border-b-[1px] border-input">
      <Image
        width={80}
        height={80}
        src="/images/logo.png"
        alt="logo"
        className="w-[80px] md:flex hidden"
      />
      <Button
        className="menuBTn flex md:hidden"
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
      >
        <IoMenu />
      </Button>
      <div className="flex items-center justify-end gap-[8px]">
        <ThemeChanger />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.user?.image || ""} alt="user avatar" />
              <AvatarFallback>
                <p className="text-muted-foreground uppercase">
                  {user?.user?.name?.slice(0, 1)}
                </p>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"}>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/admin/community-post"}>Manage Posts</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={"/dashboard/profile-setting"}>Profile Setting</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                onClick={handleLogout}
                className="w-full flex bg-destructive py-[5px] rounded-[5px] text-white center mt-[5px]"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
