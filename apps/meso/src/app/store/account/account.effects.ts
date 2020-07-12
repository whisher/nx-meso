// Redux
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

// Services
import { AccountService } from "../../services";

// Actions
import {
  accountLoad,
  accountLoadFailure,
  accountLoadSuccess,
} from "./account.slice";

export const accountLoadEffects = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(accountLoad());
  AccountService.account()
    .then((data) => {
      dispatch(accountLoadSuccess(data));
    })
    .catch(() => {
      dispatch(accountLoadFailure());
    });
};
