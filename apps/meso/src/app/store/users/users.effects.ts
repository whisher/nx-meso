// Redux
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

// Services
import { UsersService } from "../../services";

// Actions
import { usersLoad, usersLoadFailure, usersLoadSuccess } from "./users.slice";

export const usersLoadEffects = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(usersLoad());
  UsersService.all()
    .then((data) => {
      dispatch(usersLoadSuccess(data));
    })
    .catch(() => {
      dispatch(usersLoadFailure());
    });
};
