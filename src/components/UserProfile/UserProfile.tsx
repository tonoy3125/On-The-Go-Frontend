import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";

const UserProfile = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id as string;
  return (
    <Link
      href={`/${userId}`}
      className="flex items-center gap-[12px] p-[5px] hover:bg-primaryMat/5 w-full rounded-[8px]"
    >
      <div className="relative h-12 w-12 center bg-primaryMat/10 rounded-full p-[5px]">
        <Image
          width={40}
          height={40}
          src={user?.user?.image || "/images/avatar.jpg"}
          alt={user?.user?.name}
          className="rounded-full w-full h-full object-contain"
        />
      </div>
      <span className="font-[500]">{user?.user?.name}</span>
    </Link>
  );
};

export default UserProfile;
