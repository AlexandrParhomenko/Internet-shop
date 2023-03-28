import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface CartItem {
  cartItem: dataItem[];
}

const initialState: CartItem = {
  cartItem: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemState(state, action) {
      state.cartItem = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.item,
      };
    },
  },
});

export const { setItemState } = itemSlice.actions;

export const selectItemState = (state: AppState) => state.item.cartItem;

export default itemSlice.reducer;
