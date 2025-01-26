import Image from "next/image";
import "./Signin.css";
import { FaLinkedinIn } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";

const SignIn = () => {
  return (
    <div className="flex items-center w-full gap-10 bg-[#FFFFFF]">
      <div className="bg-[#DDE7EB] w-[67%] min-h-screen">
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
      <div>
        <h1 className="text-[#056464] font-semibold text-3xl  hover:opacity-70 transition-opacity duration-300 mb-1">
          Welcome To On The Go!!
        </h1>
        <p className="text-[#231928] font-medium mb-10">
          Sign in with your data that you enterd during your registration
        </p>
        <form>
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
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#231928] mb-3 opacity-90">
                Password
              </h2>
              <h2 className="text-[15px] font-medium text-[#056464] mb-3 underline">
                Forgot Password?
              </h2>
            </div>
            <input
              className="pt-2 pb-2 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[550px] mx-auto border-[#ebedf0] border-[1px] bg-[#FFFFFF] text-[#74788D] font-poppins rounded-lg focus:outline-none focus:ring-[4px] focus:ring-[#15434133] focus:border-[#056464] transition-all duration-300 ease-in-out text-sm"
              type="email"
              id=""
              placeholder="Enter Your Password"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                boxShadow: "0 0 0 0px bg-[#38b2ac]", // Default shadow
              }}
            />
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
            className=" text-start font-poppins text-sm mt-4 mb-7"
            style={{ letterSpacing: ".4px" }}
          >
            <span className="">Don't Have Your Account yet </span>
            {/* <Link to="/register">
              
            </Link> */}
            <span className="text-[#056464] cursor-pointer underline">
              {" "}
              Sign Up
            </span>
          </p>
          <div className="divider">Or sign in with</div>
          <div className="flex items-center gap-5 justify-center mt-10">
            <button className="flex items-center gap-1 bg-[#E6E9EB] hover:bg-[#E5EFEF] py-[6px] px-[13px] rounded-md">
              <FaLinkedinIn className="text-base text-[#0077B5]" />
              <span className="text-lg">LinkedIn</span>
            </button>
            <button className="flex items-center gap-1 bg-[#E6E9EB] hover:bg-[#E5EFEF] py-[6px] px-[13px] rounded-md">
              <CiFacebook className="text-base text-[#50598e]" />
              <span className="text-lg">Facebook</span>
            </button>
            <button className="flex items-center gap-1 bg-[#E6E9EB] hover:bg-[#E5EFEF] py-[6px] px-[13px] rounded-md">
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
