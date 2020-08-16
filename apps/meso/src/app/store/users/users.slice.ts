import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from '../../types';

const usersInitialState: UsersState = {
  error: false,
  loaded: false,
  data: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState as UsersState,
  reducers: {
    usersFollow: (state) => {
      return {
        ...state,
      };
    },
    usersFollowFailure: (state) => {
      return {
        ...state,
        error: true,
      };
    },
    usersFollowSuccess: (state, action) => {
      const userId = action.payload._id;
      const data = state.data.map((user) => {
        if (user._id === userId) {
          user = action.payload;
        }
        return user;
      });
      return {
        ...state,
        data,
        error: false,
        loaded: true,
      };
    },
    usersLoad: (state) => {
      return {
        ...state,
        loaded: false,
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
    usersUnFollow: (state) => {
      return {
        ...state,
      };
    },
    usersUnFollowFailure: (state) => {
      return {
        ...state,
        error: true,
      };
    },
    usersUnFollowSuccess: (state, action) => {
      const userId = action.payload._id;
      const data = state.data.map((user) => {
        if (user._id === userId) {
          user = action.payload;
        }
        return user;
      });
      return {
        ...state,
        data,
        error: false,
        loaded: true,
      };
    },
  },
});

export const {
  usersFollow,
  usersFollowFailure,
  usersFollowSuccess,
  usersLoad,
  usersLoadFailure,
  usersLoadSuccess,
  usersUnFollow,
  usersUnFollowFailure,
  usersUnFollowSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
