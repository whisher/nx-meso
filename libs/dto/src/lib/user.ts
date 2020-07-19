export interface UserDto {
  _id: string;
  avatar: string;
  email: string;
  username: string;
  createdAt: number;
  following: UserDto[];
  followers: UserDto[];
}
