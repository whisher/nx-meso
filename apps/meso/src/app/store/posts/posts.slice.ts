import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../types';

const postsInitialState: PostsState = {
  error: false,
  loaded: false,
  loading:false,
  data: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState as PostsState,
  reducers: {
    postsAdd: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    postsAddFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
        data: [],
      };
    },
    postsAddSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        data: [...state.data, action.payload],
      };
    },
    postsDelete: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    postsDeleteFailure: (state) => {
      return {
        ...state,
        error: true,
        loading: false,
      };
    },
    postsDeleteSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        data: state.data.filter((post) => post._id !== action.payload._id),
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
    postsToggleLike: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    postsToggleLikeFailure: (state) => {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
        data: [],
      };
    },
    postsToggleLikeSuccess: (state, action) => {
      const id = action.payload._id;
      console.log('payloda',action);
      const data = [...state.data].map(post=>{
        if(post._id === id){
          post.likes = action.payload.likes;
        }
        return post;
      })
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
  postsAdd,
  postsAddFailure,
  postsAddSuccess,
  postsDelete,
  postsDeleteFailure,
  postsDeleteSuccess,
  postsLoad,
  postsLoadFailure,
  postsLoadSuccess,
  postsToggleLike,
  postsToggleLikeFailure,
  postsToggleLikeSuccess
} = postsSlice.actions;

export default postsSlice.reducer;
