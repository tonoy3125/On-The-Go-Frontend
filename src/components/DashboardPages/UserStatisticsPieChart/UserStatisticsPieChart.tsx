"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUsersStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#3bb77e", "#0088FE"]; // Premium: Blue, Normal: Orange

const UserStatisticsPieChart = () => {
  const { data } = useGetUsersStatisticsQuery(undefined);
  const chartData = [
    { name: "Premium Users", value: data?.data.premiumUserCount || 0 },
    { name: "Normal Users", value: data?.data.normalUserCount || 0 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Total types of users</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserStatisticsPieChart;
