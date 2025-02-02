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
    getGroupDetailsById: builder.query({
      query: ({ groupId, token }) => ({
        url: `/group/groupDetails/${groupId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Group"],
    }),
    updateGroupByGroupId: builder.mutation({
      query: ({ token, groupId, payload }) => ({
        url: `/group/updateGroup/${groupId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useGetGroupsByUserIdQuery,
  useGetGroupsSuggestionByUserIdQuery,
  useGetGroupDetailsByIdQuery,
  useUpdateGroupByGroupIdMutation,
} = GroupApi;
