import { TResponseRedux } from "@/types/user.type";
import { baseApi } from "../../api/baseApi";
import { TFollower } from "@/types/follower.type";

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
    getFollowers: builder.query({
      query: (args) => {
        const { token, ...params } = args; // Destructure token from args

        const queryParams = new URLSearchParams();

        // Loop through params and append them to queryParams
        Object.keys(params).forEach((key) => {
          if (Array.isArray(params[key])) {
            // Handle array for categories (or other multiple values)
            params[key].forEach((value: string) => {
              queryParams.append(key, value);
            });
          } else if (params[key]) {
            // Append normal key-value pairs
            queryParams.append(key, params[key]);
          }
        });

        return {
          url: "/follower/get",
          method: "GET",
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        };
      },
      transformResponse: (response: TResponseRedux<TFollower[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Follower"],
    }),
    getFollowings: builder.query({
      query: (args) => {
        const { token, ...params } = args; // Destructure token from args

        const queryParams = new URLSearchParams();

        // Loop through params and append them to queryParams
        Object.keys(params).forEach((key) => {
          if (Array.isArray(params[key])) {
            // Handle array for categories (or other multiple values)
            params[key].forEach((value: string) => {
              queryParams.append(key, value);
            });
          } else if (params[key]) {
            // Append normal key-value pairs
            queryParams.append(key, params[key]);
          }
        });

        return {
          url: "/follower/following/get",
          method: "GET",
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        };
      },
      transformResponse: (response: TResponseRedux<TFollower[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Follower"],
    }),
  }),
});

export const {
  useFollowMutation,
  useUnFollowMutation,
  useGetFollowersQuery,
  useGetFollowingsQuery,
} = FollowerApi;
