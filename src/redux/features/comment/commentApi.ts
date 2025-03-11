import { TResponseRedux } from "@/types/user.type";
import { baseApi } from "../../api/baseApi";
import { TComment } from "@/types/comment.type";

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
    getCommentsByPostId: builder.query({
      query: (args) => {
        const { postId, token, ...params } = args; // Destructure token from args

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
          url: `/comment/${postId}`,
          method: "GET",
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        };
      },
      transformResponse: (response: TResponseRedux<TComment[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Comment"],
    }),
    updateCommentById: builder.mutation({
      query: ({ token, id, payload }) => ({
        url: `/comment/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      }),
      invalidatesTags: ["Comment"],
    }),
    removeComment: builder.mutation({
      query: ({ token, id }) => ({
        url: `/comment/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsByPostIdQuery,
  useUpdateCommentByIdMutation,
  useRemoveCommentMutation,
} = CommentApi;
