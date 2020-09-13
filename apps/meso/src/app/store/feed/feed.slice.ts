import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../types';

const postsInitialState: PostsState = {
  error: false,
  loaded: false,
  data: [],
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState: postsInitialState as PostsState,
  reducers: {
    feedLoad: (state) => {
      return {
        ...state,
        loaded: false,
      };
    },
    feedLoadFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        data: [],
      };
    },
    feedLoadSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loaded: true,
        data: action.payload,
      };
    },
  },
});

export const { feedLoad, feedLoadFailure, feedLoadSuccess } = feedSlice.actions;

export default feedSlice.reducer;
