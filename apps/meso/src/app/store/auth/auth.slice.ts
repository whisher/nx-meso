import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types";

const authInitialState: AuthState = {
  error: false,
  loading: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState as AuthState,
  reducers: {
    authLogin: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    authLoginFailure: (state) => {
      return {
        ...state,
        error: true,
        loading: false,
      };
    },
    authLoginSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        token: action.payload,
      };
    },
    authLogout: () => {
      return authInitialState;
    },
    authReset: () => {
      return authInitialState;
    },
  },
});

export const {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authReset,
} = authSlice.actions;

export default authSlice.reducer;
