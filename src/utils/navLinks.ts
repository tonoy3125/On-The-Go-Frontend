import { House, UserCheck, Users } from "lucide-react";

export const shortcutsLinks = [
  {
    path: "/",
    label: "New Feed",
    iconUrl: "/icons/home.svg",
  },
  {
    path: "/profile/settings",
    label: "Settings",
    iconUrl: "/icons/setting.svg",
  },
  {
    path: "/group",
    label: "Explore Groups",
    iconUrl: "/icons/group.svg",
  },
  {
    path: "/followers",
    label: "My Followrs",
    iconUrl: "/icons/follower.svg",
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
