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
    postsLoad: (state) => {
      return {
        ...state,
        loaded: true,
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
  postsLoad,
  postsLoadFailure,
  postsLoadSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
