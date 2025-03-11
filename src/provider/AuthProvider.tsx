"use client";

import { useGetUserStateQuery } from "@/redux/features/auth/authApi";
import {
  setLoading,
  setUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const token = useAppSelector(useCurrentToken);

  const { data, isSuccess, isFetching } = useGetUserStateQuery(
    token as string,
    {
      skip: !token,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isFetching));

    if (isSuccess) {
      dispatch(setUser({ user: data?.data }));
      dispatch(setLoading(false));
    }
  }, [isFetching, isSuccess, dispatch, data?.data]);

  return <>{children}</>;
};

export default AuthProvider;
