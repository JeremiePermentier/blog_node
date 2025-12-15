import { Router } from 'express';
import { postCreate, listPost, postEdit, postDelete, getPost } from '../controllers/post.controller';
import { login, register } from '../controllers/login.controller';
import { authMiddleware } from '../middlewares/auth';
import { commentCreate, commentEdit, commentDelete } from '../controllers/comment.controller';
import { categoryCreate, categoryDelete, categoryEdit, listCategory } from '../controllers/category.controller';
import { listTag, tagCreate, tagDelete, tagEdit } from '../controllers/tag.controller';
import multer from '../middlewares/multer-config';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Post
 *     description: Gestion des articles
 *   - name: User
 *     description: Gestion des utilisateurs
 *   - name: Comment
 *     description: Gestion des commentaires
 *   - name: Category
 *     description: Gestion des catégories
 *   - name: Tag
 *     description: Gestion des tags
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/* ============================================================
 *                        POST ROUTES
 * ============================================================ */

/**
 * @swagger
 * /api/v1/post/new:
 *   post:
 *     summary: Créer un nouveau post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post créé avec succès
 */
router.post('/api/v1/post/new', authMiddleware, multer, postCreate);

/**
 * @swagger
 * /api/v1/post/edit/{id}:
 *   patch:
 *     summary: Modifier un post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post modifié
 */
router.patch('/api/v1/post/edit/:id', authMiddleware, multer, postEdit);

/**
 * @swagger
 * /api/v1/post/delete/{id}:
 *   delete:
 *     summary: Supprimer un post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du post
 *     responses:
 *       200:
 *         description: Post supprimé
 */
router.delete('/api/v1/post/delete/:id', authMiddleware, postDelete);

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Lister tous les posts
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des posts
 */
router.get('/api/v1/posts', listPost);

/**
 * @swagger
 * /api/v1/post/{id}:
 *   get:
 *     summary: Récupérer un post par ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post récupéré
 */
router.get('/api/v1/post/:id', authMiddleware, getPost);


/* ============================================================
 *                        USER ROUTES
 * ============================================================ */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
router.post('/api/v1/users/login', login);

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/api/v1/users/register', register);


/* ============================================================
 *                    COMMENT ROUTES
 * ============================================================ */

/**
 * @swagger
 * /api/v1/comment/new:
 *   post:
 *     summary: Ajouter un commentaire
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [postId, content]
 *             properties:
 *               postId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire créé
 */
router.post('/api/v1/comment/new', authMiddleware, commentCreate);

/**
 * @swagger
 * /api/v1/comment/edit/{id}:
 *   patch:
 *     summary: Modifier un commentaire
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Commentaire modifié
 */
router.patch('/api/v1/comment/edit/:id', authMiddleware, commentEdit);

/**
 * @swagger
 * /api/v1/comment/delete/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé
 */
router.delete('/api/v1/comment/delete/:id', authMiddleware, commentDelete);


/* ============================================================
 *                    CATEGORY ROUTES
 * ============================================================ */

/**
 * @swagger
 * /api/v1/category/new:
 *   post:
 *     summary: Créer une catégorie
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catégorie créée
 */
router.post('/api/v1/category/new', authMiddleware, categoryCreate);

/**
 * @swagger
 * /api/v1/category/edit/{id}:
 *   patch:
 *     summary: Modifier une catégorie
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catégorie modifiée
 */
router.patch('/api/v1/category/edit/:id', authMiddleware, categoryEdit);

/**
 * @swagger
 * /api/v1/category/delete/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Catégorie supprimée
 */
router.delete('/api/v1/category/delete/:id', authMiddleware, categoryDelete);

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Liste des catégories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catégories
 */
router.get('/api/v1/category', authMiddleware, listCategory);


/* ============================================================
 *                      TAG ROUTES
 * ============================================================ */

/**
 * @swagger
 * /api/v1/tag/new:
 *   post:
 *     summary: Créer un tag
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag créé
 */
router.post('/api/v1/tag/new', authMiddleware, tagCreate);

/**
 * @swagger
 * /api/v1/tag/edit/{id}:
 *   patch:
 *     summary: Modifier un tag
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag modifié
 */
router.patch('/api/v1/tag/edit/:id', authMiddleware, tagEdit);

/**
 * @swagger
 * /api/v1/tag/delete/{id}:
 *   delete:
 *     summary: Supprimer un tag
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Tag supprimé
 */
router.delete('/api/v1/tag/delete/:id', authMiddleware, tagDelete);

/**
 * @swagger
 * /api/v1/tag:
 *   get:
 *     summary: Lister tous les tags
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tags
 */
router.get('/api/v1/tag', authMiddleware, listTag);

export default router;
