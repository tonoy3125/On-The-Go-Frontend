import { baseApi } from "../../api/baseApi";

const StatisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentStatistics: builder.query({
      query: (token) => ({
        url: "/statistics/payment",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Statistics"],
    }),
    getRecentStatistics: builder.query({
      query: (token) => ({
        url: "/statistics/recent",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Statistics"],
    }),
    getUsersStatistics: builder.query({
      query: (token) => ({
        url: "/statistics/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Statistics"],
    }),
    getTopUsersStatistics: builder.query({
      query: (token) => ({
        url: "/statistics/top-user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Statistics"],
    }),
  }),
});

export const {
  useGetPaymentStatisticsQuery,
  useGetRecentStatisticsQuery,
  useGetUsersStatisticsQuery,
  useGetTopUsersStatisticsQuery,
} = StatisticsApi;
