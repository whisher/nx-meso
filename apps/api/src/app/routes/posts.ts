import { Router } from 'express';
import auth from '../middlewares/jwt';
import { uploadImage } from '../middlewares/upload-image';
import { resizeImage } from '../middlewares/resize-image';
import {
  addPost,
  getFeedByUserId,
  getPostById,
  getPosts,
  getPostsByUserId,
} from '../controllers/posts.controller';

const router = Router();

router.param('postId', getPostById);

router.post('/', auth, uploadImage, resizeImage, addPost);
router.get('/', getPosts);
router.get('/by/:userId', auth, getPostsByUserId);
router.get('/feed/:userId', auth, getFeedByUserId);

export default router;
