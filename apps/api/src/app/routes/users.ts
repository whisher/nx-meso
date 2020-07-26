import { Router } from 'express';
import { getUserById, getUsers } from '../controllers/users.controller';
import auth from '../middlewares/jwt';

const router = Router();
router.param('userId', getUserById);

router.get('/', auth, getUsers);

export default router;
