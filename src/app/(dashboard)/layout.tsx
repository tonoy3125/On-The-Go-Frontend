"use client";

import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";

import Cookies from "js-cookie";
import Loader from "@/components/shared/Loader/Loader";
import {
  selectCurrentUser,
  selectIsAuthLoading,
} from "@/redux/features/auth/authSlice";
import { TUserPayload } from "@/types/user.type";
import { ThemeProvider } from "@/provider/theme-provider";
import DashboardSidebar from "@/components/DashboardPages/DashboardSideBar/DashboardSidebar";
import DashboardHeader from "@/components/DashboardPages/DashboardHeader/DashboardHeader";

export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const isLoading = useAppSelector(selectIsAuthLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    router.push("/login");
    Cookies.set("redirect", "/dashboard");
    return <></>;
  }
  if (user?.user?.role !== "admin") {
    router.push("/");
    return <></>;
  }

  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      defaultTheme="light"
    >
      <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <DashboardSidebar isOpen={isOpen} setIsopen={setIsOpen} />
        <div className="w-full h-full flex-col flex">
          <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="h-full overflow-auto smoothBar p-[20px]">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
