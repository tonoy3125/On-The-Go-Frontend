"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  selectCurrentUser,
  setUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  useUpdateProfileImageMutation,
  useUpdateUserByIdMutation,
} from "@/redux/features/user/userApi";

import { useAppSelector } from "@/redux/hook";

import { TUserPayload } from "@/types/user.type";
import { local_img_url } from "@/utils/localImageURL";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { FieldValues, useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ProfileSettingsView = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.user?.name || "",
      email: user?.user?.email || "",
      phone: user?.user?.phone || "",
      image: user?.user?.image || null,
    },
  });

  const [profileUrl, setProfileUrl] = useState<string>(
    user?.user?.image ? user.user.image : "/images/avatar.jpg"
  );

  const [updateUserById] = useUpdateUserByIdMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating profile...");
    const payload = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      image: profileUrl,
    };
    console.log(payload);

    try {
      if (profileUrl instanceof File) {
        const formData = new FormData();
        formData.append("file", profileUrl);
        // console.log([...formData.entries()]);
        const { data: imageUrl } = await updateProfileImage({
          formData,
          token,
        }).unwrap();
        
        payload.image = imageUrl;
        console.log(imageUrl);
      }

      const res = await updateUserById({ id: userId, payload, token }).unwrap();
      console.log(res);
      toast.success(res.message || "Profile Updated Successfully", {
        id: toastId,
        duration: 3000,
      });
      dispatch(
        setUser({
          user: {
            ...user,
            user: {
              ...user?.user,
              name: data.name,
              phone: data.phone,
              image: payload.image, // Update only the fields from the response
            },
          },
          token,
        })
      );
      // onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleMakeProfilePreviewUrl = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      const url = await local_img_url(file);
      console.log(url)
      setProfileUrl(url);
      setValue("image", file, { shouldValidate: true }); // Update the form value for the image field
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-[25px] font-[600] mb-[20px]">Update Information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label
              htmlFor={"image"}
              className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[whitesmoke] relative group/profile border-[1px] border-borderColor p-[3px]"
            >
              <Image
                src={profileUrl}
                width={120}
                height={120}
                alt="avatar"
                className=" w-full h-full object-cover rounded-full"
              />

              <span className="absolute top-0 left-0 bg-[#2727272f] w-full h-full scale-0 group-hover/profile:scale-[1] duration-75 rounded-full cursor-pointer center text-white">
                <FaPen />
              </span>
            </Label>
            <Input
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleMakeProfilePreviewUrl}
            />
            {/* <ErrorMessage
              name="image"
              component="div"
              className="text-red-500 text-sm mt-[5px]"
            /> */}
            <label
              htmlFor="image"
              className="p-[10px] border-[1px] border-borderColor rounded-[8px]"
            >
              <UploadIcon className="h-4 w-4" />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            {...register("name", { required: "Group name is required" })}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="lastName">Email *</Label>
          <Input
            readOnly
            value={user?.user?.email}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none bg-[whitesmoke] cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            {...register("phone", { required: "Group name is required" })}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
          />
        </div>

        <Button type="submit" className="bg-primaryMat text-white w-[100px]">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettingsView;
