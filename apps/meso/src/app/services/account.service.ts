import { environment } from '../../environments/environment';
import axios from '../../axios';
import { UserDto } from '../types';

const BASE_URL_API = environment.baseUrlApi;

const URL_ACCOUNT = `${BASE_URL_API}/api/auth/account`;

const AccountService = {
  account: (): Promise<UserDto> => {
    return axios.get(URL_ACCOUNT).then((response) => {
      return response.data;
    });
  },
};

export default AccountService;
