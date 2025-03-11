import { TResponseRedux } from "@/types/user.type";
import { baseApi } from "../../api/baseApi";
import { TCategories } from "@/types/category.type";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ token, payload }) => ({
        url: "/category",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategories: builder.query({
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
          url: "/category",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TCategories[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Category"],
    }),
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
    removeCategory: builder.mutation({
      query: ({ token, id }) => ({
        url: `/category/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByNameQuery,
  useRemoveCategoryMutation,
} = CategoryApi;
