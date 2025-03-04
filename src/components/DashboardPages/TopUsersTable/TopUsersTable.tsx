"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTopUsersStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { TTopUsers } from "@/types/user.type";

import Link from "next/link";
const TopUsersTable = () => {
  const { data } = useGetTopUsersStatisticsQuery(undefined);
  return (
    <Card className="w-full xl:max-w-[500px]  mx-auto h-[693px] overflow-auto smoothBar">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Top 10 users by most post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Post Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((user: TTopUsers) => (
              <TableRow key={user?.userId}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user?.image} alt={`${user?.name}`} />
                      <AvatarFallback>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium line-clamp-1">
                        {user?.name}
                      </span>
                      <Link
                        href={`/${user?.userId}`}
                        target="_blank"
                        className="text-primaryMat hover:underline text-[12px]"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell className="text-right">{user?.postCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopUsersTable;
