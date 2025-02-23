"use client";

import Loader from "@/components/shared/Loader/Loader";
import {
  selectCurrentUser,
  selectIsAuthLoading,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const token = useAppSelector(useCurrentToken);
  const isLoading = useAppSelector(selectIsAuthLoading);

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }
  if (!user || !token) {
    Cookies.set("redirect", "/profile");
    router.push("/");

    return <></>;
  }

  return (
    <div className="w-full min-h-screen flex items-start justify-center  py-[50px]">
      <div className="min-h-[400px] overflow-auto flex flex-col md:flex-row items-start justify-start gap-[20px] md:p-[25px] rounded-[10px] shadow-md w-full bg-white">
        {/* <ProfileSidebar /> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
