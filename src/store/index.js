import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/index";
import auth from "./auth/index";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: auth,
  },
});
