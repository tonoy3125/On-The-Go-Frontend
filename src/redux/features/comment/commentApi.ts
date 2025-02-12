import { baseApi } from "../../api/baseApi";

const CommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ token, payload }) => ({
        url: "/comment",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useCreateCommentMutation } = CommentApi;
