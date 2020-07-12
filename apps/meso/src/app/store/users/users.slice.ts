import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../../types";

const usersInitialState: UsersState = {
  error: false,
  loaded: false,
  data: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState as UsersState,
  reducers: {
    usersLoad: (state) => {
      return {
        ...state,
        loaded: true,
      };
    },
    usersLoadFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        data: [],
      };
    },
    usersLoadSuccess: (state, action) => {
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
  usersLoad,
  usersLoadFailure,
  usersLoadSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
