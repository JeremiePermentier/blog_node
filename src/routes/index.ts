import { Router, Request, Response, NextFunction } from 'express';
import { postCreate, listPost, postEdit, postDelete } from '../controllers/post.controller';
import { login } from '../controllers/login.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/api/post/new', authMiddleware, postCreate);
router.patch('/api/post/edit/:id', authMiddleware, postEdit);
router.delete('/api/post/delete/:id', authMiddleware, postDelete);
router.get('/api/posts', authMiddleware, listPost);
router.post('/api/users/login', login);

export default router;
