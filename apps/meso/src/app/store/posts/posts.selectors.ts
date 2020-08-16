import { PostDto } from '@iwdf/dto';
import { PostsState } from '../../types';

export const selectPostsData = (state: { posts: PostsState }): PostDto[] =>
  state.posts.data;
export const selectPostsError = (state: { posts: PostsState }): boolean =>
  state.posts.error;
export const selectPostsLoaded = (state: { posts: PostsState }): boolean =>
  state.posts.loaded;
