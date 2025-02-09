import { baseApi } from "../../api/baseApi";

const FollowerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    follow: builder.mutation({
      query: ({ token, payload }) => ({
        url: "/follower/create",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Follower"],
    }),
    unFollow: builder.mutation({
      query: ({ token, payload }) => ({
        url: "/follower/delete",
        method: "PUT",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Follower"],
    }),
  }),
});

export const { useFollowMutation, useUnFollowMutation } = FollowerApi;
