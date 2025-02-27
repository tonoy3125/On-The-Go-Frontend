/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import {
  setUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { AlertCircle } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";

import { toast } from "sonner";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  const newPassword = watch("newPassword");
  const oldPassword = watch("oldPassword");

  // mutaions
  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Proceeding to Reset Password");
    try {
      const passwordInfo = {
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
        confirmNewPassword: data?.confirmNewPassword,
      };
      const res = await changePassword({ passwordInfo, token }).unwrap();
      // console.log(res);
      const user = verifyToken(res?.data?.accessToken);
      // console.log(user);
      dispatch(
        setUser({
          user: { user, id: res.data.user?._id },
          token: res?.data.accessToken,
        })
      );
      toast.success(res.message || "Password changed successfully!", {
        id: toastId,
        duration: 3000,
      });
      //   navigate("/account");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-[25px] font-[600] mb-[20px]">
        Update your login credentials
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label htmlFor="oldPassword">Old Password *</Label>
          <Input
            id="oldPassword"
            type="password"
            {...register("oldPassword", {
              required: "Password Can't be Blank.",
              minLength: {
                value: 6,
                message: "Password is too short (minimum is 6 characters)",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {String(errors.oldPassword.message)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="newPassword">New Password *</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword", {
              required: "Password Can't be Blank.",
              minLength: {
                value: 6,
                message: "Password is too short (minimum is 6 characters)",
              },
              validate: (value) =>
                value !== oldPassword ||
                "New password must be different from the current password",
            })}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {String(errors.newPassword.message)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="confirmNewPassword">Confirm New Password *</Label>
          <Input
            id="confirmNewPassword"
            type="password"
            {...register("confirmNewPassword", {
              required: "Password confirmation can't be blank",
              validate: (value) =>
                value === newPassword ||
                "The password confirmation must match the provided password",
            })}
            className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm font-poppins font-medium pt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {String(errors.confirmNewPassword.message)}
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

export default UpdatePassword;
