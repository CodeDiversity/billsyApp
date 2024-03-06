/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { rehydrateAuthState } from "../thunks/userThunks";
import { User } from "../types/userTypes";

interface UserState {
  username: string | null;
  email: string | null;
  error: string | null;
  token: string | null;
  fullName: string | null;
}

const initialState: UserState = {
  username: null,
  email: null,
  token: null,
  error: null,
  fullName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.username = null;
      state.email = null;
      state.error = "";
      state.token = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(rehydrateAuthState.fulfilled, (state, action) => {
      // Set the token or user info in state based on the action payload
      if (action.payload) {
        state.token = action.payload.token;
        // Set user or other state based on the rehydrated info
      }
    });
    // Handle other cases, such as pending or rejected, if necessary
  },
});

export const { setUser, setError, logoutUser, setToken } = userSlice.actions;

export default userSlice.reducer;


export const selectCurrentUser = (state: RootState) => {
  const { username, email, fullName } = state.user;
  return { username, email, fullName };

}

// Selector to get the current error
export const selectCurrentError = (state: RootState) =>
  state.user.error;

export const selectToken = (state: RootState) => state.user.token;