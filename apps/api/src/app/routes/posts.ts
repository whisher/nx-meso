import { Router } from 'express';
import auth from '../middlewares/jwt';
import { uploadImage } from '../middlewares/upload-image';
import { resizeImage } from '../middlewares/resize-image';
import {
  addPost,
  deletePost,
  getFeedByUserId,
  getPostById,
  getPostsByUserId,
} from '../controllers/posts.controller';



const router = Router();

router.param('postId', getPostById);

router.post('/', auth, addPost);
router.delete('/:postId', auth, deletePost);
router.get('/by/:userId', auth, getPostsByUserId);
router.get('/feed/by/:userId', auth, getFeedByUserId);

export default router;
