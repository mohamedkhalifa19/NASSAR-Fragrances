import { IOrder } from "@/app/libs/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state

// Define the initial state using that type
const initialState: IOrder[] = [];

export const shoppingCart = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IOrder>) => {
      const itmIdx = state.findIndex((itm) => itm.id === action.payload.id);
      if (itmIdx != -1) {
        state[itmIdx] = {
          ...action.payload,
          quantity: state[itmIdx].quantity + 1,
        };
        return;
      }
      return [...state, action.payload];
    },
    editCart: (state, action: PayloadAction<IOrder>) => {
      const itmIdx = state.findIndex((itm) => itm.id === action.payload.id);
      if (itmIdx != -1) {
        console.log(action.payload);
        state[itmIdx] = action.payload;
      }
    },
    deleteCartItm: (state, action: PayloadAction<IOrder>) => {
      const itmIdx = state.findIndex((itm) => itm.id === action.payload.id);
      if (itmIdx != -1) {
        return state.filter((itm) => itm.id != state[itmIdx].id);
      }
      return state;
    },
    resetCart: (state) => {
      return [];
    },
  },
});

export const { addToCart, editCart, deleteCartItm, resetCart } =
  shoppingCart.actions;

export default shoppingCart.reducer;
