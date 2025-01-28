/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resetPassword] = useResetPasswordMutation();
  const searchParams = useSearchParams(); // Parse the query parameters
  const email = searchParams.get("email"); // Get email from URL
  const token = searchParams.get("token"); // Get token from URL
  //   console.log(email);
  //   console.log(token);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Proceeding to Reset Password");
    try {
      const newUpdatedPassword = {
        token,
        newPassword: data?.newPassword,
        confirmNewPassword: data?.confirmNewPassword,
      };
      const res = await resetPassword(newUpdatedPassword).unwrap();
      console.log(res);
      const user = verifyToken(res?.data?.accessToken);
      //   console.log(user);
      dispatch(
        setUser({
          user: { user, id: res?.data?.user?._id },
          token: res?.data?.accessToken,
        })
      );
      toast.success(res.message || "Password reset to the successfully!", {
        id: toastId,
        duration: 3000,
      });
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center lg:justify-start w-full md:gap-10 bg-[#FFFFFF]">
      <div className="bg-[#DDE7EB] lg:w-[67%] lg:min-h-screen hidden lg:block">
        <div>
          <Image
            src="https://i.postimg.cc/BnvCr4xS/03.png"
            alt="auth"
            className="mx-auto mt-14"
            width={800}
            height={800}
          />
        </div>
      </div>
      <div className="mt-28 lg:mt-0 mb-10 lg:mb-10 mx-3 sm:mx-4 semi-sm:mx-5 md:mx-0">
        <h1 className="text-[#056464] font-semibold sm:text-2xl md:text-3xl text-center lg:text-start  hover:opacity-70 transition-opacity duration-300 mb-1">
          Reset Password
        </h1>
        <p className="text-[#231928] font-medium mb-10 text-center lg:text-start">
          Enter a new password for {email}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 relative">
            <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
              New Password
            </h2>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type={showNewPassword ? "text" : "password"}
              id=""
              placeholder="Enter Your Password"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
              {...register("newPassword", {
                required: "Password Can't be Blank.",
                minLength: {
                  value: 6,
                  message: "Password is too short (minimum is 6 characters)",
                },
              })}
            />
            <span
              className="absolute right-4 md:right-3 top-[44px] rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowNewPassword(!showNewPassword);
              }}
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
            {errors.newPassword && (
              <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                {String(errors.newPassword.message)}
              </p>
            )}
          </div>
          <div className="mb-5 relative">
            <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
              Confirm New Password
            </h2>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type={showConfirmNewPassword ? "text" : "password"}
              id=""
              placeholder="Enter Your Password"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
              {...register("confirmNewPassword", {
                required: "Password confirmation can't be blank",
                validate: (value) =>
                  value === newPassword ||
                  "The password confirmation must match the provided password",
              })}
            />
            <span
              className="absolute right-4 md:right-3 top-[44px] rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowConfirmNewPassword(!showConfirmNewPassword);
              }}
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                {String(errors.confirmNewPassword.message)}
              </p>
            )}
          </div>
          <input
            className="w-full py-2 bg-[#056464]  text-base font-poppins text-[#fff] font-medium rounded-lg border border-[#056464] mt-5 cursor-pointer"
            style={{ letterSpacing: ".3px" }}
            type="submit"
            value="Reset Password"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
