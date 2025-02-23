import { CiUser } from "react-icons/ci";
import {
  RiLockPasswordLine,
  RiUserFollowLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
export const userProfileLinks = [
  {
    href: "/profile",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/profile/settings",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/profile/update-password",
    label: "Security",
    Icon: RiLockPasswordLine,
  },
  {
    href: "/profile/followers",
    label: "Followers",
    Icon: RiUserFollowLine,
  },
  {
    href: "/profile/following",
    label: "Following",
    Icon: SlUserFollowing,
  },
];
