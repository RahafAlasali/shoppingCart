import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: { quantity: 0 },
  shoppingCarts: [],
  products: [],
  total: 0,
};

export const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.shoppingCarts = state.shoppingCarts.map((item) => {
        if (item.id == +action.payload)
          return { id: +action.payload, quantity: item.quantity + 1 };
        else return item;
      });
    },
    decrease: (state, action) => {
      state.shoppingCarts = state.shoppingCarts.map((item) => {
        if (item.id == +action.payload)
          return { id: +action.payload, quantity: item.quantity - 1 };
        else return item;
      });
    },
    addQuantityCartShopping: (state) => {
      state.shoppingCart.quantity += 1;
    },
    reduceQuantityCartShopping: (state) => {
      state.shoppingCart.quantity -= 1;
    },
    removeItemToCart: (state, action) => {
      state.shoppingCarts = state.shoppingCarts.filter(
        (item) => +item.id != +action.payload
      );
    },
    addItemToCart: (state, action) => {
      state.shoppingCarts = [
        ...state.shoppingCarts,
        { id: +action.payload, quantity: 1 },
      ];
    },
    setProductsArray: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrease,
  addQuantityCartShopping,
  reduceQuantityCartShopping,
  addItemToCart,
  removeItemToCart,
  setProductsArray,
} = quantitySlice.actions;

export default quantitySlice.reducer;
