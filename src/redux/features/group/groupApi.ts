import { baseApi } from "../../api/baseApi";

const GroupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createReview: builder.mutation({
    //   query: ({ token, reviewData }) => ({
    //     url: "/review",
    //     method: "POST",
    //     body: reviewData,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ["Review"],
    // }),
    getGroupsByUserId: builder.query({
      query: (token) => ({
        url: "/group/my-group",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Group"],
    }),
    getGroupsSuggestionByUserId: builder.query({
      query: (token) => ({
        url: "/group/my-group-suggestions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Group"],
    }),
  }),
});

export const { useGetGroupsByUserIdQuery,useGetGroupsSuggestionByUserIdQuery } = GroupApi;
