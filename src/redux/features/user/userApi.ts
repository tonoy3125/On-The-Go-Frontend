import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: ({ userId, token }) => ({
        url: `/users/profile/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Auth"],
    }),
    updateUserById: builder.mutation({
      query: ({ token, id, payload }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateProfileImage: builder.mutation({
      query: ({ token, formData }) => ({
        url: "/users/update-profile-image",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserByIdMutation,
  useUpdateProfileImageMutation,
} = userApi;
