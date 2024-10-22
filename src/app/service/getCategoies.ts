import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CategoriesSlice = createApi({
    reducerPath:"category",
    tagTypes:["category"],
    baseQuery:fetchBaseQuery({baseUrl:  "http://localhost:1337" }),
    endpoints:(builder)=>({
        GetCategories: builder.query({
            query: () => {
                return {
                    url: "/api/categories"
                };
            },
            providesTags: (result) =>
                result
                  ? [
                      ...result.data.map(({ id }:{id:number}) => ({ type: 'category' as const, id })),
                      { type: 'category', id: 'LIST' },
                    ]
                  : [{ type: 'category', id: 'LIST' }],
        })
    })
})

export const {useGetCategoriesQuery} = CategoriesSlice;