import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import data from "../data.json"

export interface CartItem {
  cartItem: dataItem[];
  curCartItem: dataItem[];
  amount: number[]
}

const initialState: CartItem = {
  cartItem: [],
  curCartItem: [data.products.items[0]],
  amount: []
};




export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemState(state, action) {
      state.cartItem = action.payload;
    },
    setCurItemState(state, action) {
      state.curCartItem = action.payload;
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


export const { setItemState, setCurItemState, setAmount } = itemSlice.actions;

export const selectItemState = (state: AppState) => state.item.cartItem;
export const selectCurItemState = (state: AppState) => state.item.curCartItem;
export const selectAmountItemState = (state: AppState) => state.item.amount;


export default itemSlice.reducer;
