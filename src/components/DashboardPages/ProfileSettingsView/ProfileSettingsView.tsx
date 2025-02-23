/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
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
import { AlertCircle, UploadIcon } from "lucide-react";
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
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [updateUserById] = useUpdateUserByIdMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const dispatch = useDispatch();

  const onSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Updating profile...");
    const payload: Record<string, any> = {};

    // Extract new image and other fields
    const { image: newImage, ...newRest } = values;
    const { image: oldImage, ...oldRest } = user?.user || {};

    // Check for updated fields
    Object.entries(newRest).forEach(([key, value]) => {
      if (oldRest[key as keyof typeof oldRest] !== value) {
        payload[key] = value;
      }
    });

    try {
      let image = profileUrl; // Default to existing image

      // Handle profile image upload
      if (profileFile) {
        const formData = new FormData();
        formData.append("file", profileFile);

        const { data: uploadedImageUrl } = await updateProfileImage({
          token,
          file: formData, // Ensure correct payload format
        }).unwrap();
        console.log(uploadedImageUrl);

        image = uploadedImageUrl.image; // Update image URL after upload
        payload.image = image; // Add image to payload if changed
      }

      // If no fields have changed, do nothing
      if (!Object.keys(payload).length) {
        toast.success("No changes detected.");
        toast.dismiss(toastId);
        return;
      }

      // Send update request
      const res = await updateUserById({ id: userId, payload, token }).unwrap();

      // Update Redux store
      dispatch(
        setUser({
          user: {
            ...user,
            user: { ...user?.user, ...payload },
          },
          token,
        })
      );

      toast.success(res.message || "Profile Updated Successfully", {
        id: toastId,
        duration: 3000,
      });
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
    const file = event.target.files?.[0];
    if (file) {
      const url = await local_img_url(file);
      setProfileUrl(url); // Show preview
      setProfileFile(file); // Store the actual file for upload
      setValue("image", file as unknown as string, { shouldValidate: true });
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
            {...register("name", { required: "Group Name is Required" })}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {String(errors.name.message)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email *</Label>
          <Input
            readOnly
            value={user?.user?.email}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none bg-[whitesmoke] cursor-not-allowed"
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {String(errors.email.message)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            {...register("phone", { required: "Phone Number is Required" })}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {String(errors.phone.message)}
            </p>
          )}
        </div>

        <Button type="submit" className="bg-primaryMat text-white w-[100px]">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettingsView;
