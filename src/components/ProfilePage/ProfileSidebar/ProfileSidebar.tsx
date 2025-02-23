"use client";

import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { userProfileLinks } from "@/utils/profileSidebarLinks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
const ProfileSidebar = () => {
  const path = usePathname();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID

  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-[15px] w-full md:w-fit">
      <button
        className="flex items-center justify-start gap-[10px]"
        onClick={handleGoBack}
      >
        <FaArrowLeft /> Go Back
      </button>
      {user &&
        userProfileLinks.map(({ Icon, href, label }, i) => (
          <Link
            href={href}
            key={"profile" + i}
            className={`w-full md:w-[240px] border-[1px] border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] ${
              path === href
                ? "bg-primaryMat text-white"
                : "bg-white text-primaryTxt"
            }`}
          >
            <Icon /> {label}
          </Link>
        ))}

      <button
        className="w-[240px] border-[1px] border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] bg-red-400 text-white mt-[50px]"
        onClick={handleLogout}
      >
        <CiLogout /> Logout
      </button>
    </div>
  );
};

export default ProfileSidebar;
