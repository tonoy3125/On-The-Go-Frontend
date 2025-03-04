"use client";

import StatisticSkeleton from "@/components/skeletons/StatisticSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { useGetUsersStatisticsQuery } from "@/redux/features/statistics/statisticsApi";

import { FiUser } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserStarLine } from "react-icons/ri";
import UserCountCard from "../UserCountCard/UserCountCard";

export const description = "An interactive bar chart";
const chartConfig = {
  value: {
    label: "amount",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

function UserStatistics() {
  const { data, isLoading } = useGetUsersStatisticsQuery(undefined);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const { normalUserCount, premiumUserCount } = data?.data || {};
  const result = [
    {
      name: "Total user",
      value: (normalUserCount || 0) + (premiumUserCount || 0) || 0,
      icon: HiOutlineUserGroup,
    },
    {
      name: "Normal user",
      value: normalUserCount || 0,
      icon: FiUser,
    },
    {
      name: "Verified user",
      value: premiumUserCount || 0,
      icon: RiUserStarLine,
    },
  ];

  if (isLoading) {
    return <StatisticSkeleton />;
  }

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>User - Statistics</CardTitle>
            <CardDescription>Showing statistics of all users</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6 flex gap-[15px]">
          {result.map((item, index) => (
            <UserCountCard
              key={index}
              label={item.name}
              value={item.value.toFixed(2)}
              icon={item.icon}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserStatistics;
