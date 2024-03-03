// src/features/user/userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser, setError, setUser } from '../slices/userSlice';
import { getErrorMessage } from '../../../common/errorMessages';
import client from '../../../axiosConfig';
import { LoginResponse, LoginValues, User } from '../types/userTypes';
import { RootState } from '../../../store';
import { fetchBills } from '../../Bills/thunks/billThunks';


// Define a type for your expected error structure if possible
interface ErrorResponse {
  response?: {
    data?: {
      code?: string;
      message?: string;
    };
  };
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (values: LoginValues, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post<LoginResponse>("auth/login", values);
      const { access_token, userName, email } = response.data;

      if (access_token) {
        const user: User = { username: userName, email, token: access_token };
        dispatch(setUser(user));
        localStorage.setItem("token", access_token);
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

async function fetchUserData(): Promise<User> {
  const response = await client.get<User>('users');
  console.log('fetchUserData response:', response);
  return response.data;
}