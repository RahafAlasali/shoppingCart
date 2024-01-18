import { configureStore } from "@reduxjs/toolkit";
import quantityReducer from "./state";
export const store = configureStore({
  reducer: {
    quantity: quantityReducer,
  },
});
