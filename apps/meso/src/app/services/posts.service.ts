import { environment } from '../../environments/environment';
import axios from '../../axios';
import { PostDto } from '@iwdf/dto';

// Types
import { PostFormData } from '../types';

const BASE_URL_API = environment.baseUrlApi;

const URL_POSTS = `${BASE_URL_API}/api/posts`;
const URL_POSTS_BY_USER = `${BASE_URL_API}/api/posts/by`;
const URL_FEED_BY_USER = `${BASE_URL_API}/api/posts/feed/by`;
const URL_TOGGLE_LIKE = `${BASE_URL_API}/api/posts`;

const PostsService = {
  add: (data: PostFormData): Promise<PostDto[]> => {
    const formData = new FormData();
    formData.append('text', data.text);
    formData.append('image', data.image);
    return axios.post(URL_POSTS, formData).then((response) => {
      return response.data;
    });
  },
  getPostsByUserId: (userId: string): Promise<PostDto[]> => {
    return axios.get(`${URL_POSTS_BY_USER}/${userId}`).then((response) => {
      return response.data;
    });
  },
  getFeedByUserId: (userId: string): Promise<PostDto[]> => {
    return axios.get(`${URL_FEED_BY_USER}/${userId}`).then((response) => {
      return response.data;
    });
  },
  deleteByPostId: (postId: string): Promise<PostDto> => {
    return axios.delete(`${URL_POSTS}/${postId}`).then((response) => {
      return response.data;
    });
  },
  toggleLike: (data:{postId: string}): Promise<PostDto> => {
    return axios.put(URL_TOGGLE_LIKE,data).then((response) => {
      return response.data;
    });
  },
};

export default PostsService;
