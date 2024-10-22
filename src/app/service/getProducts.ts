import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "../../Cookies/cookies";

export const productsSlice = createApi({
  reducerPath: "products",
  tagTypes: ["products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337" }),
  endpoints: (builder) => ({
    getproducts: builder.query({
      query: () => {
        return {
          url: "/api/proudcts?populate=thumbnail&populate=category",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number }) => ({
                type: "products" as const,
                id,
              })),
              { type: "products", id: "LIST" },
            ]
          : [{ type: "products", id: "LIST" }],
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/api/proudcts/${id}?populate=thumbnail&populate=category`,
        };
      },
    }),

    DeleteProduct: builder.mutation({
      query: (id: number) => {
        return {
          url: `/api/proudcts/${id}`,
          method: "Delete",
          headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),
    UpdateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/proudcts/${id}`,
          method: "Put",
          body: data,
          headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
        };
      },
      invalidatesTags: ["products"],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsSlice.util.updateQueryData("getproducts", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    CreateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/api/proudcts`,
          method: "Post",
          body: data,
          headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
        };
      },
      invalidatesTags: ["products"],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsSlice.util.updateQueryData("getproducts", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetproductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation
} = productsSlice;
