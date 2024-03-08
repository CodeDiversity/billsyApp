
export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';

export interface User {
  username: string;
  email: string;
  token: string | null;
}

export interface SetUserAction {
  type: 'SET_USER';
  payload: User;
}

export interface SetErrorAction {
  type: 'SET_ERROR';
  payload: string;
}

export type UserActionTypes = SetUserAction | SetErrorAction;

export interface LoginValues {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  userName: string;
  email: string;
  fullName: string;
  categories: string[];
}

export interface User {
  username: string;
  email: string;
  fullName: string;
  categories: string[];
}

export interface ErrorResponse {
  response?: {
    data?: {
      code?: string;
      message?: string;
    };
  };
}
