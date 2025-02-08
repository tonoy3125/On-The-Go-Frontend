import { TResponseRedux } from "@/types/user.type";
import { baseApi } from "../../api/baseApi";
import { IPost } from "@/types/post.types";

const PostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ token, payload }) => ({
        url: "/post",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    getUserProfilePost: builder.query({
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
          url: "/post/userPost",
          method: "GET",
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        };
      },
      transformResponse: (response: TResponseRedux<IPost[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Post"],
    }),
  }),
});

export const { useCreatePostMutation, useGetUserProfilePostQuery } = PostApi;
