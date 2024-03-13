// src/features/user/userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser, setError, setToken, setUser, updateUserInfo } from '../slices/userSlice';
import { getErrorMessage } from '../../../common/errorMessages';
import client from '../../../axiosConfig';
import { ErrorResponse, LoginResponse, LoginValues, SettingsUser, User } from '../types/userTypes';
import { RootState } from '../../../store';
import { fetchBills } from '../../Bills/thunks/billThunks';


// Define a type for your expected error structure if possible


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (values: LoginValues, { dispatch, rejectWithValue }) => {

    try {
      const response = await client.post<LoginResponse>("auth/login", values);
      const { access_token, userName, email, fullName, categories } = response.data;

      if (access_token) {
        const user: User = { username: userName, email, token: access_token, fullName, categories };
        dispatch(setUser(user));
        localStorage.setItem("token", access_token);
        dispatch(setToken(access_token));
        await dispatch(fetchBills());
      } else {
        // Handle case where access_token is undefined or null
        return rejectWithValue("Login failed: No access token received.");
      }
    } catch (error) {
      const err = error as ErrorResponse;
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.code) {
        errorMessage = getErrorMessage(err.response.data.code); // Ensure getErrorMessage exists and is imported
      }

      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);


export const rehydrateAuthState = createAsyncThunk<
  User | null, // Return type of the payload creator
  void, // First argument to the payload creator
  { state: RootState } // Types for ThunkAPI
>('auth/rehydrate', async (_, { dispatch }) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const userData = await fetchUserData();
      dispatch(fetchBills());
      dispatch(setUser(userData));
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error, e.g., by clearing the token or logging out
      dispatch(logoutUser());
      return null;
    }
  }
  // Token not found, consider logging out or handling as necessary
  dispatch(logoutUser());
  return null;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (values: SettingsUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.patch<SettingsUser>("users", values);
      dispatch(updateUserInfo(response.data));
    } catch (error) {
      const err = error as ErrorResponse;
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.code) {
        errorMessage = getErrorMessage(err.response.data.code);
      }

      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

async function fetchUserData(): Promise<User> {
  const response = await client.get<User>('users');
  console.log('fetchUserData response:', response);
  return response.data;
}