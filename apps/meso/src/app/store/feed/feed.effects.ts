// Redux
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Models
import { CommentFormData } from '../../types';

// Services
import { PostsService } from '../../services';

// Actions
import {
  feedAddComment,
  feedAddCommentFailure,
  feedAddCommentSuccess,
  feedLoad,
  feedLoadFailure,
  feedLoadSuccess,
  feedToggleLike,
  feedToggleLikeFailure,
  feedToggleLikeSuccess,
} from './feed.slice';

export const feedLoadEffects = (userId: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(feedLoad());
  PostsService.getFeedByUserId(userId)
    .then((data) => {
      dispatch(feedLoadSuccess(data));
    })
    .catch(() => {
      dispatch(feedLoadFailure());
    });
};

export const feedToggleLikeEffects = (data: { postId: string }) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(feedToggleLike());
  PostsService.toggleLike(data)
    .then((res) => {
      dispatch(feedToggleLikeSuccess(res));
    })
    .catch(() => {
      dispatch(feedToggleLikeFailure());
    });
};

export const addCommentEffects = (data: CommentFormData) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(feedAddComment());
  PostsService.addComment(data)
    .then((res) => {
      dispatch(feedAddCommentSuccess(res));
    })
    .catch(() => {
      dispatch(feedAddCommentFailure());
    });
};
