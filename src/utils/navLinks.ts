import { House, UserCheck, Users } from "lucide-react";

export const shortcutsLinks = [
  {
    path: "/",
    label: "New Feed",
    iconUrl: "/public/icons/home.svg",
  },
  {
    path: "/profile/settings",
    label: "Settings",
    iconUrl: "/public/icons/setting.svg",
  },
  {
    path: "/group",
    label: "Explore Groups",
    iconUrl: "/public/icons/group.svg",
  },
  {
    path: "/followers",
    label: "My Followrs",
    iconUrl: "/public/icons/follower.svg",
  },
];

export const navLinks = [
  {
    path: "/",
    label: "Feed",
    Icon: House,
  },
  {
    path: "/group",
    label: "Groups",
    Icon: Users,
  },
  {
    path: "/followers",
    label: "Followers",
    Icon: UserCheck,
  },
];
