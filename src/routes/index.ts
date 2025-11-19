import { Router, Request, Response, NextFunction } from 'express';
import { postCreate, listPost, postEdit, postDelete, getPost } from '../controllers/post.controller';
import { login, register } from '../controllers/login.controller';
import { authMiddleware } from '../middlewares/auth';
import { commentCreate, commentEdit, commentDelete } from '../controllers/comment.controller';

const router = Router();

// Post routes
router.post('/api/post/new', authMiddleware, postCreate);
router.patch('/api/post/edit/:id', authMiddleware, postEdit);
router.delete('/api/post/delete/:id', authMiddleware, postDelete);
router.get('/api/posts', authMiddleware, listPost);
router.get('/api/post/:id', authMiddleware, getPost);

// Users routes
router.post('/api/users/login', login);
router.post('/api/users/register', register);

// Comment routes
router.post('/api/comment/new', authMiddleware, commentCreate);
router.patch('/api/comment/edit/:id', authMiddleware, commentEdit);
router.delete('/api/comment/delete/:id', authMiddleware, commentDelete);

export default router;
