import { TResponseRedux } from "@/types/user.type";
import { baseApi } from "../../api/baseApi";
import { TGroup } from "@/types/group.type";

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
      query: (args) => {
        const params = new URLSearchParams();

        // Loop through args and append them to params
        Object.keys(args).forEach((key) => {
          if (Array.isArray(args[key])) {
            // Handle array for categories (or other multiple values)
            args[key].forEach((value: string) => {
              params.append(key, value);
            });
          } else if (args[key]) {
            // Append normal key-value pairs
            params.append(key, args[key]);
          }
        });

        return {
          url: "/group/my-group-suggestions",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TGroup[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
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
    getGroupMemberByGroupId: builder.query({
      query: ({ groupId, token }) => ({
        url: `/group/groupMember/${groupId}`,
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
  useGetGroupMemberByGroupIdQuery,
  useUpdateGroupByGroupIdMutation,
} = GroupApi;
