import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

 export  const  LoginSlice = createApi({
    reducerPath:"Login",
    tagTypes:["LoginSlice"],
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:1337"}),
    endpoints:(builder)=>({
        LoginAuth: builder.mutation({
            query: ((arag) => {
                return {
                    url: "/api/auth/local",
                    method:"Post",
                    body:arag
                }
            })
        })
    })
 })

 export const  {useLoginAuthMutation} = LoginSlice