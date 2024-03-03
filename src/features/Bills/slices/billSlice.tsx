import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  bills: [],
  error: '',
};


const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<[]>) => {
      state.bills = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setBills, setError } = billSlice.actions;

export default billSlice.reducer;