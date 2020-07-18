import * as jwt from 'express-jwt';
import { environment } from '../../environments/environment';

const authenticate = jwt({
  secret: environment.jwtSecret,
});

export default authenticate;
