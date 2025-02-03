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
  }),
});

export const { useJoinGroupMutation } = GroupMemberApi;
