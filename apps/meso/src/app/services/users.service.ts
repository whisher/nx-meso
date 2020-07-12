import { environment } from '../../environments/environment';
import axios from '../../axios';
import { UserDto } from '../types';

const BASE_URL_API = environment.baseUrlApi;

const URL_USERS = `${BASE_URL_API}/api/users`;

const UsersService = {
  all: (): Promise<UserDto[]> => {
    return axios.get(URL_USERS).then((response) => {
      return response.data;
    });
  },
};

export default UsersService;
