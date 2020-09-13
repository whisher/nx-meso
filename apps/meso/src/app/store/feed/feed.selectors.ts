import { PostDto } from '@iwdf/dto';
import { PostsState } from '../../types';

export const selectFeedData = (state: { feed: PostsState }): PostDto[] =>
  state.feed.data;
export const selectFeedError = (state: { feed: PostsState }): boolean =>
  state.feed.error;
export const selectFeedLoaded = (state: { feed: PostsState }): boolean =>
  state.feed.loaded;
