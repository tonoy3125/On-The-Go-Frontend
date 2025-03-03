"use client";

import PremiumAccess from "@/components/PremiumAccess/PremiumAccess";
import Loader from "@/components/shared/Loader/Loader";
import {
  selectCurrentUser,
  selectIsAuthLoading,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { format } from "date-fns";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";

const ProfilePage = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const isLoading = useAppSelector(selectIsAuthLoading);

  const router = useRouter();

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }
  if (!user) {
    Cookies.set("redirect", "/profile");
    router.push("/");

    return <></>;
  }

  return (
    <div className="w-full rounded-[10px] px-[25px] py-[20px]">
      <div className="flex items-start justify-start gap-[20px]">
        <Link
          href={"/profile/settings"}
          className="w-[120px] h-[120px] rounded-full overflow-hidden bg-red-100 relative group/profile"
        >
          <Image
            src={user?.user?.image || "/images/avatar.jpg"}
            width={120}
            height={120}
            alt="avatar"
            className=" w-full h-full object-cover"
          />

          <span className="absolute top-0 left-0 bg-[#2727272f] w-full h-full scale-0 group-hover/profile:scale-[1] duration-75 rounded-full cursor-pointer center text-white">
            <FaPen />
          </span>
        </Link>
        <h3 className="text-[20px] font-[600] mt-[20px]">{user?.user?.name}</h3>
      </div>
      <p className="text-primaryTxt mt-[20px]">
        <span className="font-[600]">Email: </span> {user?.user?.email}
      </p>
      <p className="text-primaryTxt mt-[8px]">
        <span className="font-[600]">user since: </span>{" "}
        {format(new Date(user?.user?.createdAt || "12-30-2024"), "MMM dd, yyy")}
      </p>
      {!user?.user?.isPremium && user?.user?.role === "user" ? (
        <PremiumAccess />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePage;
