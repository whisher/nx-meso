import * as jwt from 'express-jwt';
import { environment } from '../../environments/environment';

const authenticate = jwt({
  secret: environment.jwtSecret,
  algorithms: ['HS256'] 
});

export default authenticate;
