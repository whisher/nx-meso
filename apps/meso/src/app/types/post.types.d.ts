import { PostDto } from '@iwdf/dto';

export interface PostFormData {
  text: string;
  image?: string;
}

export interface PostsState {
  error: boolean;
  loaded: boolean;
  loading: boolean;
  data: PostDto[];
}
