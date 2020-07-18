import * as express from 'express';
import { getUsers } from '../controllers/users.controller';
import auth from '../middlewares/jwt';

const router = express.Router();

router.get('/', auth, getUsers);

export default router;
