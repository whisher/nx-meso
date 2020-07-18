import * as express from 'express';

import { account, login, signup } from '../controllers/auth.controller';
import * as AuthValidator from '../validators/auth.validator';
import auth from '../middlewares/jwt';

const router = express.Router();

router.get('/account', auth, account);
router.post('/login', AuthValidator.login, login);
router.post('/signup', AuthValidator.signup, signup);

export default router;
