import { TResponseRedux, TUserData } from "@/types/user.type";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const { token, ...params } = args; // Destructure token from args

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
          url: "/users",
          method: "GET",
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        };
      },
      transformResponse: (response: TResponseRedux<TUserData[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Auth"],
    }),
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
    updateUserRole: builder.mutation({
      query: ({ token, id, role }) => ({
        url: `/users/role/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { role },
      }),
      invalidatesTags: ["Auth"],
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
      query: ({ token, file }) => ({
        url: "/users/update-profile-image",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: file,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserByIdMutation,
  useUpdateUserRoleMutation,
  useUpdateProfileImageMutation,
} = userApi;
