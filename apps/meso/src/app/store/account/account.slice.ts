import { createSlice } from "@reduxjs/toolkit";
import { AccountState } from "../../types";

const accountInitialState: AccountState = {
  error: false,
  loaded: false,
  data: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState as AccountState,
  reducers: {
    accountLoad: (state) => {
      return {
        ...state,
        loaded: true,
      };
    },
    accountLoadFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        data: null,
      };
    },
    accountLoadSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loaded: true,
        data: action.payload,
      };
    },
  },
});

export const {
  accountLoad,
  accountLoadFailure,
  accountLoadSuccess,
} = accountSlice.actions;

export default accountSlice.reducer;
