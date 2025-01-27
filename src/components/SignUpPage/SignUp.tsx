"use client";
import Image from "next/image";
import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import "./Signup.css";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  return (
    <div className="flex items-center justify-center lg:justify-start w-full md:gap-10 bg-[#FFFFFF]">
      <div className="bg-[#DDE7EB] lg:w-[67%] lg:min-h-screen hidden lg:block">
        <div>
          <Image
            src="https://i.postimg.cc/prZTxNDx/Register.png"
            alt="register"
            className="mx-auto mt-32"
            width={870}
            height={870}
          />
        </div>
      </div>
      <div className="mt-10 lg:mt-0 mb-10 lg:mb-10 mx-3 sm:mx-4 semi-sm:mx-5 md:mx-0">
        <h1 className="text-[#056464] font-semibold sm:text-2xl md:text-3xl text-center lg:text-start  hover:opacity-70 transition-opacity duration-300 mb-1">
          Create Account
        </h1>
        <p className="text-[#231928] font-medium mb-10 text-center lg:text-start">
          Get Started For Free Today!
        </p>
        <form>
          <div className="mb-5">
            <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
              Name
            </h2>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type="text"
              id=""
              placeholder="Enter Your User Name"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
            />
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
            />
          </div>
          <div className="mb-5">
            <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
              Phone
            </h2>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type="text"
              id=""
              placeholder="Enter Your Phone"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
            />
          </div>
          <div className="mb-5 relative">
            <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
              Password
            </h2>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type={showRegisterPassword ? "text" : "password"}
              id=""
              placeholder="Enter Your Password"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
            />
            <span
              className="absolute right-4 md:right-3 top-[44px] rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowRegisterPassword(!showRegisterPassword);
              }}
            >
              {showRegisterPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="rememberMe" />
            <label className="custom-checkbox" htmlFor="rememberMe"></label>
            <label
              className="checkbox-label"
              htmlFor="rememberMe"
              style={{ letterSpacing: ".4px" }}
            >
              Accept Terms & Conditions
            </label>
          </div>
          <input
            className="w-full py-2 bg-[#056464]  text-base font-poppins text-[#fff] font-medium rounded-lg border border-[#056464] mt-5 cursor-pointer"
            style={{ letterSpacing: ".3px" }}
            type="submit"
            value="Sign Up"
          />
          <p
            className=" text-center lg:text-start font-poppins text-sm mt-4 mb-7"
            style={{ letterSpacing: ".4px" }}
          >
            <span className="">Already Have A Account? </span>
            <Link href="/login">
              <span className="text-[#056464] cursor-pointer underline">
                {" "}
                Sign In
              </span>
            </Link>
          </p>
          <div className="divider">Or sign in with</div>
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

export default SignUp;
