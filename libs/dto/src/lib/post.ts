import { UserDto } from './user';

export interface PostDto {
  _id: string;
  text: string;
  image?: string;
  likes: any[];
  comments: any[];
  postedBy: UserDto;
  createdAt: Date;
}
