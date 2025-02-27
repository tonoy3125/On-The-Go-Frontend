import { baseUrl } from "@/redux/api/baseApi";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { useEffect, useState } from "react";

const PremiumAccess = () => {
  const [isCapable, setIsCapable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    const checkCapable = async () => {
      const url = baseUrl + "/user/can-have-premium";
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

  return ;
};

export default PremiumAccess;
