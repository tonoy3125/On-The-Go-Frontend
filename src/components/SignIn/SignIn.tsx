/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import "./Signin.css";
import { FaLinkedinIn } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Divider from "../shared/Divider/Divider";
import { loginCredentials } from "@/lib/credentials";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading("Logging In...");
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };
      // console.log(userInfo);
      const res = await login(userInfo).unwrap();
      // console.log(res);
      const user = verifyToken(res.accessToken);
      // console.log(user);
      dispatch(
        setUser({ user: { user, id: res.data._id }, token: res.accessToken })
      );
      toast.success(res.message || "Logged In Successfully!j", {
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
            src="https://i.ibb.co.com/d426M2w/Login.png"
            alt="auth"
            className="mx-auto mt-32"
            width={870}
            height={870}
          />
        </div>
      </div>
      <div className="mt-10 lg:mt-0 mb-10 lg:mb-10 mx-3 sm:mx-4 semi-sm:mx-5 md:mx-0">
        <h1 className="text-[#056464] font-semibold sm:text-2xl md:text-3xl text-center lg:text-start  hover:opacity-70 transition-opacity duration-300 mb-1">
          Welcome To On The Go!!
        </h1>
        <p className="text-[#231928] font-medium mb-10 text-center lg:text-start">
          Sign in with your data that you enterd during your registration
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex font-poppins flex-col gap-[5px]">
            <h3 className="block text-[18px] font-semibold mb-5sign">
              Quick Login{" "}
            </h3>
            <div className="flex items-center justify-start  gap-[10px] flex-wrap mb-[20px]">
              {loginCredentials.map(({ email, password, label }, i) => (
                <button
                  key={"login" + i}
                  type="button"
                  className="w-fit bg-[#fff] border-[1px] border-[#dae1e3] font-[700] text-[#1D1D1F] rounded-full px-[15px] py-[5px] text-[12px] active:scale-[0.8]"
                  style={{ transition: "0.3s" }}
                  onClick={() => {
                    // Set form values when button is clicked
                    reset({
                      email: email,
                      password: password,
                    });
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
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
          <div className="mb-5 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
                Password
              </h2>
              <Link href="/forgot-password">
                <h2 className="text-[15px] font-medium text-[#056464] mb-3 underline">
                  Forgot Password?
                </h2>
              </Link>
            </div>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type={showLoginPassword ? "text" : "password"}
              id=""
              placeholder="Enter Your Password"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
              {...register("password", {
                required: "Password is Required",
              })}
            />
            <span
              className="absolute right-4 md:right-3 top-[44px] rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowLoginPassword(!showLoginPassword);
              }}
            >
              {showLoginPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                {String(errors.password.message)}
              </p>
            )}
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="rememberMe" />
            <label className="custom-checkbox" htmlFor="rememberMe"></label>
            <label
              className="checkbox-label"
              htmlFor="rememberMe"
              style={{ letterSpacing: ".4px" }}
            >
              Remember Me
            </label>
          </div>
          <input
            className="w-full py-2 bg-[#056464]  text-base font-poppins text-[#fff] font-medium rounded-lg border border-[#056464] mt-5 cursor-pointer"
            style={{ letterSpacing: ".3px" }}
            type="submit"
            value="Sign In"
          />
          <p
            className=" text-center lg:text-start font-poppins text-sm mt-4 mb-7"
            style={{ letterSpacing: ".4px" }}
          >
            <span className="">Don't Have Your Account yet </span>
            <Link href="/register">
              <span className="text-[#056464] cursor-pointer underline">
                {" "}
                Sign Up
              </span>
            </Link>
          </p>
          <Divider />
          <div className="flex flex-col semi-sm:flex-row items-center gap-3 semi-sm:gap-5 justify-center mt-10">
            <button className="flex items-center justify-center w-full gap-1 bg-[#E6E9EB] hover:bg-[#E5EFEF] py-[6px] px-[13px] rounded-md">
              <FaLinkedinIn className="text-base text-[#0077B5]" />
              <span className="text-lg">LinkedIn</span>
            </button>
            <button className="flex items-center w-full justify-center gap-1 bg-[#E6E9EB] hover:bg-[#E5EFEF] py-[6px] px-[13px] rounded-md">
              <CiFacebook className="text-base text-[#50598e]" />
              <span className="text-lg">Facebook</span>
            </button>
            <button className="flex items-center w-full justify-center gap-1 bg-[#E6E9EB] hover:bg-[#E5EFEF] py-[6px] px-[13px] rounded-md">
              <IoLogoGithub className="text-base text-[#6fa2d8]" />
              <span className="text-lg">Github</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
