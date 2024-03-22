/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { rehydrateAuthState } from '../thunks/userThunks';
import { SettingsUser, User } from "../types/userTypes";
import { createSelector } from "reselect";

interface UserState {
  username: string | null;
  email: string | null;
  error: string | null;
  token: string | null;
  fullName: string | null;
  categories: string[];
}

const initialState: UserState = {
  username: null,
  email: null,
  token: null,
  error: null,
  fullName: null,
  categories: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<SettingsUser>) => {
      Object.assign(state, action.payload);
    },
    logoutUser: (state) => {
      state.username = null;
      state.email = null;
      state.error = "";
      state.token = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
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

export const { setUser, setError, logoutUser, setToken, updateUserInfo} = userSlice.actions;

export default userSlice.reducer;


const userSelector = (state: { user: any; }) => state.user;

// Memoized selector: only recomputes when `state.user` changes.
export const selectCurrentUser = createSelector(
  [userSelector], // Array of input selectors.
  (user) => {
    // This function only runs when `state.user` changes.
    return user;
  }
);

// Selector to get the current error
export const selectCurrentError = (state: RootState) =>
  state.user.error;

export const selectToken = (state: RootState) => state.user.token;

export const selectCategories = (state: RootState) => state.user.categories;