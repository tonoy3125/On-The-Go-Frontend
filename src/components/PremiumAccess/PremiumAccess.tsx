import { baseUrl } from "@/redux/api/baseApi";
import {
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import GetPremiumAccess from "../GetPremiumAccess/GetPremiumAccess";
import NotEligble from "../NotEligble/NotEligble";

const PremiumAccess = () => {
  const [isCapable, setIsCapable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    const checkCapable = async () => {
      const url = baseUrl + "/users/can-have-premium";
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data)

        setIsCapable(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    checkCapable();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{isCapable ? <GetPremiumAccess /> : <NotEligble />}</div>;
};

export default PremiumAccess;
