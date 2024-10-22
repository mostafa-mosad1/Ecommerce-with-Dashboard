import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./service/getProducts";
import { CartReducer } from "./feature/CartSlice";
import { LoginSlice } from "./service/LoginSlice";
import { CategoriesSlice } from "./service/getCategoies";

export const store = configureStore({
    reducer:{
        Cart:CartReducer,
        [productsSlice.reducerPath]:productsSlice.reducer,
        [LoginSlice.reducerPath]:LoginSlice.reducer,
        [CategoriesSlice.reducerPath]:CategoriesSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsSlice.middleware).concat(LoginSlice.middleware).concat(CategoriesSlice.middleware), 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch