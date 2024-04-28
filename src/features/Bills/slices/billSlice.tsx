import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { Bill } from "../types/Bill";


const initialState = {
  bills: [] as Bill[],
  error: '',
};


const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setBills, setError } = billSlice.actions;

export default billSlice.reducer;

export const selectUserBills = (state: RootState) => state.bill.bills;