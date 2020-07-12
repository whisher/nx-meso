// Redux
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { push } from "connected-react-router";

// Types
import { AuthLoginFormData } from "../../types";

// Services
import { AuthService } from "../../services";

// Actions
import { authLoginFailure, authLoginSuccess } from "./auth.slice";

// Effects
import { accountLoadEffects } from "../account";

export const authLoginEffects = (data: AuthLoginFormData) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  AuthService.login(data)
    .then((data) => {
      dispatch(authLoginSuccess(data));
      dispatch(accountLoadEffects());
      dispatch(push("/"));
    })
    .catch(() => {
      dispatch(authLoginFailure());
    });
};
