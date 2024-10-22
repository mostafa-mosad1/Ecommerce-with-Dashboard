import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Icart, Iproduct } from "../../interface";



const x = localStorage.getItem("CartProduct");

const initialState: Icart = {
  isLoading: false,
  CartItems: x ? JSON.parse(x!) : [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addPeoductsToCart: (state, action: PayloadAction<Iproduct>) => {
      state.CartItems = [...state.CartItems, action.payload];
      localStorage.setItem("CartProduct", JSON.stringify(state.CartItems));
    },
    deletePeoductsToCart: (state, action: PayloadAction<number>) => {
      state.CartItems = state.CartItems.filter((item) =>
        item.id != action.payload ? item : ""
      );
      localStorage.setItem("CartProduct", JSON.stringify(state.CartItems));
    },
    ClearCart: (state) => {
      state.CartItems = [];
      localStorage.setItem("CartProduct", "[]");
    },
  },
});

export const CartReducer = CartSlice.reducer;
export const { addPeoductsToCart, deletePeoductsToCart, ClearCart } =
  CartSlice.actions;
