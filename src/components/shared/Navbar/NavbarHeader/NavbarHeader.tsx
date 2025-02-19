"use client";

import { useAppSelector } from "@/redux/hook";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderTooptip from "../../Tooltip/HeaderTooltip";
import { navLinks } from "@/utils/navLinks";
import { AccountPanel } from "@/components/AccountPanel/AccountPanel";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TUserPayload } from "@/types/user.type";
import HeaderSearchBar from "../HeaderSearchBar/HeaderSearchBar";

const NavbarHeader = () => {
  const path = usePathname();

  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  return (
    <header className="py-[5px] border-b sticky top-0 z-50 bg-white ">
      <div className="layout_container flex justify-between gap-4 items-center relative">
        <HeaderSearchBar />
        <nav className="flex w-fit md:w-full relative z-[1] items-center justify-center">
          {navLinks.map((nav) => {
            const Icon = nav.Icon;
            return (
              <HeaderTooptip delay={400} message={nav.label} key={nav.path}>
                <Link
                  href={nav.path}
                  className={`px-[25px] md:px-[35px] h-[50px] center relative ${
                    nav.path === path
                      ? "activeRoute text-primaryMat"
                      : "hover:bg-primaryMat/10 "
                  }`}
                >
                  <Icon className={`size-6 flex-none`} />
                </Link>
              </HeaderTooptip>
            );
          })}
        </nav>

        <div className="flex gap-3 items-center justify-start md:absolute right-[10px] sm:right-[20px] 2xl:right-[80px] z-[2]">
          {user ? (
            <AccountPanel />
          ) : (
            <Link href="/login" className="text-slate-700 hover:text-green-500">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarHeader;
