import { AuthState } from "../../types";

export const selectAuthError = (state: { auth: AuthState }): boolean =>
  state.auth.error;
export const selectAuthIsLoading = (state: { auth: AuthState }): boolean =>
  state.auth.loading;
export const selectAuthToken = (state: {
  auth: AuthState;
}): AuthState["token"] | null => state.auth.token;
export const selectAuthIsAuthenticated = (state: {
  auth: AuthState;
}): boolean => state.auth.token !== null;
