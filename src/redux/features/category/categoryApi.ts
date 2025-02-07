import { baseApi } from "../../api/baseApi";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryByName: builder.query({
      query: ({ name, token }) => ({
        url: `/category/${name}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoryByNameQuery } = CategoryApi;
