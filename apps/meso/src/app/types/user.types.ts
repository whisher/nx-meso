export interface UserDto {
  _id: string;
  avatar: string;
  email: string;
  username: string;
}

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
