/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useUpdateGroupByGroupIdMutation } from "@/redux/features/group/groupApi";
import { useAppSelector } from "@/redux/hook";
import { TGroup } from "@/types/group.type";
import { AlertCircle, FileEdit, Globe, Lock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

type TGroupDataProps = {
  data: {
    group: TGroup;
  };
};

const GroupEdit = ({ groupData }: { groupData: TGroupDataProps }) => {
  const group = groupData?.data?.group;
  const groupId = groupData?.data?.group?._id;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
      privacy: group?.privacy || "public",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);

  const [updateGroupByGroupId, { isLoading }] =
    useUpdateGroupByGroupIdMutation();

  useEffect(() => {
    if (group) {
      reset({
        name: group?.name || "",
        description: group?.description || "",
        privacy: group?.privacy || "public",
      });
    }
  }, [group, reset]);

  const onSubmit = async (data: FieldValues) => {
    if (isLoading) return;
    const toastId = toast.loading("Updating Group...");

    const payload = { ...data };

    try {
      const res = await updateGroupByGroupId({
        groupId: groupId,
        payload,
        token,
      }).unwrap();
      console.log(res);
      toast.success(res.message || "Group Updated Successfully", {
        id: toastId,
        duration: 3000,
      });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  // Watch privacy value
  const privacyValue = watch("privacy", "public"); // Default to 'public'

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FileEdit className="w-6 h-6" />
            Edit Group
          </DialogTitle>
          <DialogDescription>
            Update your group information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Group name is required" })}
                placeholder="Enter group name"
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium flex items-center gap-2"
              >
                <FileEdit className="w-4 h-4" />
                Description
              </Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Describe your group"
                className="w-full min-h-[100px]"
              />
              {errors.description && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {String(errors.description.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="privacy"
                className="text-sm font-medium flex items-center gap-2"
              >
                {privacyValue.privacy === "public" ? (
                  <Globe className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                Privacy
              </Label>
              <Select
                value={privacyValue}
                onValueChange={(value) => setValue("privacy", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select privacy setting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              disabled={isLoading}
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primaryMat center gap-[5px]">
              Update Group
              {isLoading ? <FaSpinner className="spinner" /> : ""}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GroupEdit;
