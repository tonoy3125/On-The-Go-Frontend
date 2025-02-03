import { baseApi } from "../../api/baseApi";

const GroupMemberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinGroup: builder.mutation({
      query: ({ token, groupId }) => ({
        url: `/group-member/join-group/${groupId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["GroupMember"],
    }),
    leaveGroup: builder.mutation({
      query: ({ token, groupId }) => ({
        url: `/group-member/leave-group/${groupId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["GroupMember"],
    }),
    checkMembership: builder.query({
      query: ({ token, groupId }) => ({
        url: `/group-member/check-membership/${groupId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["GroupMember"],
    }),
  }),
});

export const {
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useCheckMembershipQuery,
} = GroupMemberApi;
