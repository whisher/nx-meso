// Redux
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Services
import { PostsService } from '../../services';

// Actions
import { feedLoad, feedLoadFailure, feedLoadSuccess } from './feed.slice';

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
