"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { upLoadSingeImage } from "@/utils/uploadSingleImage";
import { Camera, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

const CreateGroup = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  const token = useAppSelector(useCurrentToken);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) {
      return;
    }
    // Show preview before upload
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
    setValue("image", previewUrl); // Update form value for preview
    try {
      const { data } = await upLoadSingeImage(file, token || "");
      console.log(data);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center flex-col-reverse md:flex-row justify-start w-full gap-[15px]">
        <form
          //   onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-start w-full md:w-[50%] xl:w-[30%] gap-[15px]"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create New Group</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  placeholder="Enter group name"
                  {...register("name", { required: "Group name is required" })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What's your group about?"
                  {...register("description", {
                    required: "Group Description is required",
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Privacy</Label>
                <Select onValueChange={setPrivacy} value={privacy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Group Privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Group Privacy</SelectLabel>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primaryMat/10 text-primaryMat border-[1px] border-primaryMat/20 hover:bg-primaryMat hover:text-white center gap-[5px]"
              >
                Create Group{" "}
                {isLoading ? <FaSpinner className="spinner" /> : ""}
              </Button>
            </CardContent>
          </Card>
        </form>
        <Card className="w-full md:w-[50%] xl:w-[70%]">
          <CardHeader>
            <CardTitle>Group Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
              <div className="relative h-[200px]">
                <img
                  src={image || "/images/travelGroup.png"}
                  alt="Group cover"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {watch("name") || "Your Group Name"}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {privacy} group · 1 member
                </div>
                <p className="text-sm text-muted-foreground">
                  {watch("description") || "No description provided"}
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <Input placeholder="What's on your mind?" />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1">
                      <Camera className="mr-2 h-4 w-4" />
                      Photo/video
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      Tag people
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateGroup;
