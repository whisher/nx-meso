export interface UserDto {
  _id: string;
  about: string;
  avatar: string;
  email: string;
  username: string;
  createdAt: number;
  following: UserDto[];
  followers: UserDto[];
}
