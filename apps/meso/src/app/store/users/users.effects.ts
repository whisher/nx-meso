// Redux
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Models
import { UserDto } from '@iwdf/dto';

// Services
import { UsersService } from '../../services';

// Actions
import {
  usersFollow,
  usersFollowFailure,
  usersFollowSuccess,
  usersLoad,
  usersLoadFailure,
  usersLoadSuccess,
  usersUnFollow,
  usersUnFollowFailure,
  usersUnFollowSuccess,
} from './users.slice';

export const usersLoadEffects = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(usersLoad());
  UsersService.all()
    .then((data: UserDto[]) => {
      dispatch(usersLoadSuccess(data));
    })
    .catch(() => {
      dispatch(usersLoadFailure());
    });
};

export const usersFollowEffects = (data: UserDto) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(usersFollow());
  UsersService.follow(data)
    .then((res) => {
      dispatch(usersFollowSuccess(res));
    })
    .catch(() => {
      dispatch(usersFollowFailure());
    });
};

export const usersUnFollowEffects = (data: UserDto) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(usersUnFollow());
  UsersService.unfollow(data)
    .then((res) => {
      dispatch(usersUnFollowSuccess(res));
    })
    .catch(() => {
      dispatch(usersUnFollowFailure());
    });
};
