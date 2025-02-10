import { baseApi } from "../../api/baseApi";

const ReactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    follow: builder.mutation({
      query: ({ token, payload }) => ({
        url: "/reaction/change",
        method: "PATCH",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Reaction"],
    }),
  }),
});

export const { useFollowMutation } = ReactionApi;
