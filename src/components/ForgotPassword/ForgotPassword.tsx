/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgetPassword] = useForgetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Sending Email...");
    try {
      const userInfo = {
        email: data?.email,
      };
      const res = await forgetPassword(userInfo).unwrap();
      toast.success(
        res.message ||
          "We've sent you an email with a link to update your password.!",
        {
          id: toastId,
          duration: 3000,
        }
      );
      router.push("/login");
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
          Enter the email address associated with your account.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
              Email Address
            </h2>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type="email"
              id=""
              placeholder="Enter Your Email"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
              {...register("email", {
                required: "Email is Required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          <input
            className="w-full py-2 bg-[#056464]  text-base font-poppins text-[#fff] font-medium rounded-lg border border-[#056464] mt-5 cursor-pointer"
            style={{ letterSpacing: ".3px" }}
            type="submit"
            value="Continue"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
