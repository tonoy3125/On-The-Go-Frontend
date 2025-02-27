"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { baseUrl } from "@/redux/api/baseApi";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";

import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
const GetPremiumAccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);

  const handleGetPremiumAccess = async () => {
    setIsLoading(true);
    try {
      const url = baseUrl + "/users/get-verify-url";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = (await res.json()) || {};

      if (data && data.payment_url) {
        window.location.href = data.payment_url;
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={() => setIsLoading(false)}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="mt-[20px] relative group/premium"
        >
          Verify Account
          <Image
            width={100}
            height={100}
            src="/images/crown.png"
            alt="verify"
            className="absolute top-[-13px] right-[-16px] rotate-[20deg] w-[40px] scale-1 group-hover/premium:rotate-0 group-hover/premium:scale-[1.2]"
            style={{ transition: "0.3s" }}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            You&lsquo;re Eligible for Premium Verification!
          </DialogTitle>
          <DialogDescription>
            Congratulations! You can now verify your account and get premium
            access.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Premium Access Benefits
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Verified badged on profile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Create and view premium posts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Exclusive content from other premium users
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Enhanced profile features
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Premium Access Price</p>
            <p className="text-3xl font-bold text-primary">200 BDT</p>
            <Badge variant="secondary" className="mt-2">
              Cancel anytime
            </Badge>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Maybe Later</Button>
          </DialogClose>
          <Button
            onClick={handleGetPremiumAccess}
            className="flex items-center justify-center gap-[5px]"
          >
            Continue to Verification{" "}
            {isLoading ? <ImSpinner2 className="spinner h-4 w-4" /> : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GetPremiumAccess;
