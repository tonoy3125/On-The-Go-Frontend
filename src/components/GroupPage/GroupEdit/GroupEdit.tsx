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
import { useUpdateGroupByGroupIdMutation } from "@/redux/features/group/groupApi";
import { FileEdit, Globe, Lock, Users } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";

const GroupEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const [updateGroupByGroupId, { isLoading }] =
    useUpdateGroupByGroupIdMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
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
                name="name"
                placeholder="Enter group name"
                className="w-full"
              />
              {/* <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm flex items-center mt-1"
              >
                {(msg) => (
                  <>
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {msg}
                  </>
                )}
              </ErrorMessage> */}
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
                name="description"
                placeholder="Describe your group"
                className="w-full min-h-[100px]"
              />
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
