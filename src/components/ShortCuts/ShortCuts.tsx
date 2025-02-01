'use client'
import { shortcutsLinks } from "@/utils/navLinks";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import UserProfile from "../UserProfile/UserProfile";

const ShortCuts = () => {
  return (
    <div>
      <h2 className="font-semibold mb-[15px]">Shortcuts</h2>
      <div className="flex flex-col gap-[5px]">
        <UserProfile />
        {shortcutsLinks.map(({ iconUrl, label, path }, i) => (
          <Link
            href={path}
            key={i + "shortcut"}
            className="flex items-center gap-[12px] p-[5px] hover:bg-primaryMat/5"
          >
            <span className="w-[48px] h-[48px] rounded-[8px] overflow-hidden bg-white center">
              <Image alt="" src={iconUrl} width={30} height={30} />
            </span>
            <span className="font-[500]">{label}</span>
          </Link>
        ))}
      </div>

      <Separator className="my-[15px]" />
    </div>
  );
};

export default ShortCuts;
