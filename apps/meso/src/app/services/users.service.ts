import { environment } from '../../environments/environment';
import axios from '../../axios';
import { UserDto } from '@iwdf/dto';

const BASE_URL_API = environment.baseUrlApi;

const URL_USERS = `${BASE_URL_API}/api/users`;
const URL_USER_FOLLOW = `${BASE_URL_API}/api/users/follow`;
const UsersService = {
  all: (): Promise<UserDto[]> => {
    return axios.get(URL_USERS).then((response) => {
      return response.data;
    });
  },
  addFollow: (data: UserDto): Promise<UserDto> => {
    return axios.put(URL_USER_FOLLOW, data).then((response) => {
      return response.data;
    });
  },
};

export default UsersService;
