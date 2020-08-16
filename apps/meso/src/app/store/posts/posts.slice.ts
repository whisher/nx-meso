import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../types';

const postsInitialState: PostsState = {
  error: false,
  loaded: false,
  data: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState as PostsState,
  reducers: {
    postsAdd: (state) => {
      return {
        ...state,
        loaded: true,
      };
    },
    postsAddFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        data: [],
      };
    },
    postsAddSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loaded: true,
        data: [...state.data, action.payload],
      };
    },
    postsLoad: (state) => {
      return {
        ...state,
        loaded: false,
      };
    },
    postsLoadFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        data: [],
      };
    },
    postsLoadSuccess: (state, action) => {
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
  postsAdd,
  postsAddFailure,
  postsAddSuccess,
  postsLoad,
  postsLoadFailure,
  postsLoadSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;