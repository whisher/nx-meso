import { Router } from 'express';
import {
  addFollower,
  addFollowing,
  deleteFollowing,
  deleteFollower,
  getUserById,
  getUsers,
} from '../controllers/users.controller';
import auth from '../middlewares/jwt';

const router = Router();
router.param('userId', getUserById);

router.get('/', auth, getUsers);

router.put('/follow', auth, addFollowing, addFollower);
router.put('/unfollow', auth, deleteFollowing, deleteFollower);

export default router;
