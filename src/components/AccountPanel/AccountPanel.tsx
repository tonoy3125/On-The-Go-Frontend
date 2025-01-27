import { LogOut } from "lucide-react";

import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import Image from "next/image";
// import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TUserPayload } from "@/types/user.type";
import { useRouter } from "next/navigation";

export function AccountPanel() {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
    Cookies.remove("refreshToken");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="avatarGradient center p-[5px] rounded-full cursor-pointer">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image
              alt="profile"
              src={user?.user?.image || "/images/avatar.jpg"}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          {user ? (
            <>
              {user.role === "admin" ? (
                <Link href="/dashboard" className="cursor-pointer">
                  <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
              ) : (
                <Link href={`/${user._id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                </Link>
              )}
              <Link href="/profile/settings" className="cursor-pointer">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />

                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
            </>
          ) : (
            <></>
          )}
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
