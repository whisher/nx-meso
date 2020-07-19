import * as express from 'express';
import { getUsers } from '../controllers/users.controller';
import auth from '../middlewares/jwt';

const router = express.Router();

router.get('/', getUsers);

export default router;
