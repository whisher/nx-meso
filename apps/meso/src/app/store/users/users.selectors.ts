import { UserDto } from '@iwdf/dto';
import { UsersState } from '../../types';

export const selectUsersData = (state: { users: UsersState }): UserDto[] =>
  state.users.data;
export const selectUsersError = (state: { users: UsersState }): boolean =>
  state.users.error;
export const selectUsersLoaded = (state: { users: UsersState }): boolean =>
  state.users.loaded;
