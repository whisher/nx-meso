import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../types';

const postsInitialState: PostsState = {
  error: false,
  loaded: false,
  loading: false,
  data: [],
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState: postsInitialState as PostsState,
  reducers: {
    feedAddComment: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    feedAddCommentFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
        data: [],
      };
    },
    feedAddCommentSuccess: (state, action) => {
      const id = action.payload._id;
      const data = state.data.map((post) => {
        if (post._id === id) {
          return action.payload;
        }
        return post;
      });
      return {
        ...state,
        error: false,
        loading: false,
        data,
      };
    },
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
    feedToggleLike: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    feedToggleLikeFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
        data: [],
      };
    },
    feedToggleLikeSuccess: (state, action) => {
      const id = action.payload._id;
      const data = state.data.map((post) => {
        if (post._id === id) {
          return action.payload;
        }
        return post;
      });
      return {
        ...state,
        error: false,
        loading: false,
        data,
      };
    },
  },
});

export const {
  feedAddComment,
  feedAddCommentFailure,
  feedAddCommentSuccess,
  feedLoad,
  feedLoadFailure,
  feedLoadSuccess,
  feedToggleLike,
  feedToggleLikeFailure,
  feedToggleLikeSuccess,
} = feedSlice.actions;

export default feedSlice.reducer;
