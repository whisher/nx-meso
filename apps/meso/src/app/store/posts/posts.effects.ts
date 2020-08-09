// Redux
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Services
import { PostsService } from '../../services';

// Actions
import { postsLoad, postsLoadFailure, postsLoadSuccess } from './posts.slice';

export const postsLoadEffects = (userId: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(postsLoad());
  PostsService.getPostsByUserId(userId)
    .then((data) => {
      dispatch(postsLoadSuccess(data));
    })
    .catch(() => {
      dispatch(postsLoadFailure());
    });
};
