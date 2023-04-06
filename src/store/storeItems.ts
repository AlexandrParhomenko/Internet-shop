import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import data from "../data.json"

export interface CartItem {
  cartItem: dataItem[];
  pickedItem: dataItem;
  amount: number[]
}

const initialState: CartItem = {
  cartItem: [],
  pickedItem: data.products.items[0],
  amount: []
};




export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setCartItemState(state, action) {
      state.cartItem = action.payload;
    },
    setCurItemState(state, action) {
      state.pickedItem = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    }
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


export const { setCartItemState, setCurItemState, setAmount } = itemSlice.actions;

export const selectCartItemState = (state: AppState) => state.item.cartItem;
export const selectCurItemState = (state: AppState) => state.item.pickedItem;
export const selectAmountItemState = (state: AppState) => state.item.amount;


export default itemSlice.reducer;
