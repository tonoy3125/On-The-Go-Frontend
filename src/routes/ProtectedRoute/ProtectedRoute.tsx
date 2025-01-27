"use client";
import Loader from "@/components/shared/Loader/Loader";
import {
  selectCurrentUser,
  selectIsAuthLoading,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TRole, TUserPayload } from "@/types/user.type";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
interface IProps {
  role: TRole | "*";
  children: React.ReactNode;
}

const Protectedroute: React.FC<IProps> = ({ role, children }) => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const token = useAppSelector(useCurrentToken);
  const isLoading = useAppSelector(selectIsAuthLoading);
  const router = useRouter();
  const path = usePathname();

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }

  if (!user || !token) {
    Cookies.set("redirect", path);
    router.push("/login");
    return <></>;
  }

  if (user.user?.role !== role && role !== "*") {
    router.push("/");
    return <></>;
  }

  return children;
};

export default Protectedroute;
