import { Router, Request, Response, NextFunction } from 'express';
import { postCreate, listPost, postEdit, postDelete } from '../controllers/post.controller';

const router = Router();


router.post('/new', postCreate);
router.patch('/edit/:id', postEdit);
router.delete('/delete/:id', postDelete);
router.get('/posts', listPost);

export default router;
