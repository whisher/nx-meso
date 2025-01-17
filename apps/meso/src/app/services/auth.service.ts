import { environment } from '../../environments/environment';
import axios from '../../axios';
import { AuthLoginFormData, AuthSignupFormData } from '../types';
import { AuthTokenDto, UserDto } from '@iwdf/dto';

const BASE_URL_API = environment.baseUrlApi;
const URL_LOGIN = `${BASE_URL_API}/api/auth/login`;
const URL_SIGNUP = `${BASE_URL_API}/api/auth/signup`;

const AuthService = {
  login: (data: AuthLoginFormData): Promise<AuthTokenDto> => {
    return axios.post(URL_LOGIN, data).then((response) => {
      return response.data;
    });
  },

  signup: (data: AuthSignupFormData): Promise<UserDto> => {
    return axios.post(URL_SIGNUP, data).then((response) => {
      return response.data;
    });
  },
};

export default AuthService;
