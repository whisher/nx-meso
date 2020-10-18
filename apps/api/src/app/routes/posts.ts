import { Router } from 'express';
import auth from '../middlewares/jwt';
import { uploadImage } from '../middlewares/upload-image';
import { resizeImage } from '../middlewares/resize-image';
import * as PostValidator from '../validators/post.validator';
import {
  addComment,
  addPost,
  deletePost,
  getFeedByUserId,
  getPostById,
  getPostsByUserId,
  toggleLike,
} from '../controllers/posts.controller';

const router = Router();

router.param('postId', getPostById);

router.post('/', auth, PostValidator.add, uploadImage, resizeImage, addPost);
router.delete('/:postId', auth, deletePost);
router.get('/by/:userId', auth, getPostsByUserId);
router.get('/feed/by/:userId', auth, getFeedByUserId);
router.put('/', auth, toggleLike);
router.put('/comment', auth, addComment);
export default router;
