import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface appState {
  products: any[];
}

const initialState: appState = {
  products: [],
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = appSlice.actions;
export default appSlice.reducer;
