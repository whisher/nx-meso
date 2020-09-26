// Redux
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Models
import { PostDto } from '@iwdf/dto';
import { PostFormData } from '../../types';

// Services
import { PostsService } from '../../services';

// Actions
import {
  postsAdd,
  postsAddFailure,
  postsAddSuccess,
  postsDelete,
  postsDeleteFailure,
  postsDeleteSuccess,
  postsLoad,
  postsLoadFailure,
  postsLoadSuccess,
} from './posts.slice';

export const postsAddEffects = (data: PostFormData) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(postsAdd());
  PostsService.add(data)
    .then((res) => {
      dispatch(postsAddSuccess(res));
    })
    .catch(() => {
      dispatch(postsAddFailure());
    });
};

export const postsDeleteEffects = (data: PostDto) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(postsDelete());
  PostsService.deleteByPostId(data._id)
    .then((res) => {
      dispatch(postsDeleteSuccess(res));
    })
    .catch(() => {
      dispatch(postsAddFailure());
    });
};

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
