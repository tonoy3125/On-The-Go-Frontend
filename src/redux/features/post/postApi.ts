import { baseApi } from "../../api/baseApi";

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
  }),
});

export const { useCreatePostMutation } = PostApi;
