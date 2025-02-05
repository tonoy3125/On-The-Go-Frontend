"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useUpdateUserByIdMutation } from "@/redux/features/user/userApi";

import { useAppSelector } from "@/redux/hook";

import { TUserPayload } from "@/types/user.type";

import { useForm } from "react-hook-form";

const ProfileSettingsView = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id as string;
  const {
    register,
    // handleSubmit,
    // setValue,
    // watch,
    // reset,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.user?.name || "",
      email: user?.user?.email || "",
      phone: user?.user?.phone || "",
    },
  });

  //   const [profileUrl, setProfileUrl] = useState(image || "/images/avatar.jpg");

  const [updateUserById] = useUpdateUserByIdMutation();

  //   const onSubmit = async (values: FormValues) => {
  //     const toastId = toast.loading("Please wait");
  //     const payload: Record<string, any> = {};

  //     const { image, ...newRest } = values;
  //     const { image: img, ...oldrest } = initialValues;

  //     const newValues = Object.entries(newRest);

  //     newValues.forEach(([key, value]) => {
  //       if (oldrest[key as key] !== value) {
  //         payload[key] = value;
  //       }
  //     });
  //     try {
  //       if (image) {
  //         const formData = new FormData();
  //         formData.append("file", image);
  //         await updateProfileImage(formData);
  //       }

  //       if (!Object.keys(payload).length) {
  //         toast.success("nothing");
  //         toast.dismiss(toastId);
  //         return;
  //       }
  //       toast.success("Profile updated");
  //       await updateDetails(payload);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Something went wrong while updating your details");
  //     } finally {
  //       toast.dismiss(toastId);
  //     }
  //   };

  //   const handleMakeProfilePreviewUrl = async (file: File) => {
  //     const url = await local_img_url(file);
  //     setProfileUrl(url);
  //   };

  return (
    <div className="w-full">
      <h1 className="text-[25px] font-[600] mb-[20px]">Update Information</h1>
      <form>
        {/* <div className="grid gap-2">
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
              name="image"
              type="file"
              className="invisible w-0"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  setFieldValue("image", file);
                  handleMakeProfilePreviewUrl(file);
                }
              }}
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500 text-sm mt-[5px]"
            />
            <label
              htmlFor="image"
              className="p-[10px] border-[1px] border-borderColor rounded-[8px]"
            >
              <UploadIcon className="h-4 w-4" />
            </label>
          </div>
        </div> */}

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
