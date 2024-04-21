import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: { quantity: JSON.parse(localStorage.getItem("quantityCart")) },
  shoppingCarts: JSON.parse(localStorage.getItem("shoppingCarts")),
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
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
      state.shoppingCart.quantity -= 1;
      state.shoppingCarts = state.shoppingCarts.filter(
        (item) => +item.id != +action.payload
      );
    },
    addItemToCart: (state, action) => {
      state.shoppingCart.quantity += 1;
      state.shoppingCarts = [
        ...state.shoppingCarts,
        { id: +action.payload, quantity: 1 },
      ];
    },
    setProductsArray: (state, action) => {
      state.products = action.payload;
    },
    setShoppingCartsArray: (state, action) => {
      state.shoppingCarts = action.payload;
    },
    setQuantityCart: (state, action) => {
      state.shoppingCart.quantity = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
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
  setShoppingCartsArray,
  setQuantityCart,
  setTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
