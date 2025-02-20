/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hook";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const token = useAppSelector(useCurrentToken);
  const [createCategory] = useCreateCategoryMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Creating Category...");
    try {
      const payload = {
        name: data?.name,
      };
      console.log(payload);
      const res = await createCategory({ token, payload }).unwrap();
      // console.log(res);
      toast.success(res.message || "Category Created Successfully!", {
        id: toastId,
        duration: 3000,
      });
      setIsDialogOpen(false);
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-[8px]">
            <Label htmlFor="name">Category Name</Label>
            <Input
              {...register("name", {
                required: "Category Name is Required",
              })}
              id="name"
              className="col-span-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                {String(errors.name.message)}
              </p>
            )}
          </div>
          <Button>Create Category</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
