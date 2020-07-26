import { UserDto } from '@iwdf/dto';

export interface AccountState {
  error: boolean;
  loaded: boolean;
  data: UserDto | null;
}

export interface UsersState {
  error: boolean;
  loaded: boolean;
  data: UserDto[];
}
