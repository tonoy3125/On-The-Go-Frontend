import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LeftSidebar from "../LeftSidebar/LeftSidebar";

const HeaderSearchBar = () => {
  const path = usePathname();
  return (
    <div className="flex items-center gap-2 md:absolute left-[10px] sm:left-[20px] lg:left-[80px] z-[2]">
      <LeftSidebar />
      <Link href={"/"} className="text-lg font-bold">
        <Image
          width={60}
          height={60}
          src="/images/logo.png"
          alt="logo"
          className="w-[60px] md:flex hidden"
        />
      </Link>
      {path === "/" ? (
        <form className="w-[200px] lg:w-[350px] h-[40px] border-[1px] border-input rounded-full pl-[10px] my-[15px] hidden md:flex items-center justify-between overflow-hidden">
          <input
            type="text"
            placeholder="Search groups"
            name="search"
            id="search"
            className="w-full h-full outline-none bg-transparent border-transparent"
          />
          <button className="h-full px-[15px] center bg-primaryMat/20">
            <SearchIcon className="shrink-0 text-primaryMat" />
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderSearchBar;
