"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useDebounce from "@/hooks/debounce";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

import { format } from "date-fns";
import { useState } from "react";
import DeleteCategory from "../DeleteCategory/DeleteCategory";

export default function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const debounsedSearchTerm = useDebounce(searchTerm, 500);

  const { data, refetch } = useGetAllCategoriesQuery({
    page: 1,
    limit: 10,
    searchTerm: debounsedSearchTerm,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Category Search</h1>
        {/* <CreateCategory /> */}
      </div>
      <Input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((category) => (
                <TableRow key={category?._id}>
                  <TableCell>{category?.name}</TableCell>
                  <TableCell>
                    {format(
                      new Date(category.createdAt || "2024-09-29"),
                      "MMM dd, yyyy"
                    )}
                  </TableCell>
                  <TableCell>
                    <DeleteCategory refetch={refetch} id={category._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
