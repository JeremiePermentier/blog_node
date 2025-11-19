import { Router } from 'express';
import { postCreate, listPost, postEdit, postDelete, getPost } from '../controllers/post.controller';
import { login, register } from '../controllers/login.controller';
import { authMiddleware } from '../middlewares/auth';
import { commentCreate, commentEdit, commentDelete } from '../controllers/comment.controller';

const router = Router();

/**
 * @swagger
 * /api/post/new:
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mon premier post"
 *               content:
 *                 type: string
 *                 example: "Ceci est le contenu de mon post"
 *     responses:
 *       200:
 *         description: Post créé avec succès
 */
router.post('/api/post/new', authMiddleware, postCreate);

/**
 * @swagger
 * /api/post/edit/{id}:
 *   patch:
 *     summary: Modifier un post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nouveau titre"
 *               content:
 *                 type: string
 *                 example: "Contenu modifié"
 *     responses:
 *       200:
 *         description: Post modifié
 */
router.patch('/api/post/edit/:id', authMiddleware, postEdit);

/**
 * @swagger
 * /api/post/delete/{id}:
 *   delete:
 *     summary: Supprimer un post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du post
 *     responses:
 *       200:
 *         description: Post supprimé
 */
router.delete('/api/post/delete/:id', authMiddleware, postDelete);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lister tous les posts
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des posts
 */
router.get('/api/posts', authMiddleware, listPost);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Récupérer un post par son ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post récupéré
 */
router.get('/api/post/:id', authMiddleware, getPost);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@test.com"
 *               password:
 *                 type: string
 *                 example: "monmotdepasse"
 *     responses:
 *       200:
 *         description: Utilisateur connecté
 */
router.post('/api/users/login', login);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@test.com"
 *               password:
 *                 type: string
 *                 example: "monmotdepasse"
 *     responses:
 *       200:
 *         description: Utilisateur créé
 */
router.post('/api/users/register', register);

/**
 * @swagger
 * /api/comment/new:
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
 *             properties:
 *               postId:
 *                 type: string
 *                 example: "645dd45aa2b3e"
 *               content:
 *                 type: string
 *                 example: "Ceci est un commentaire"
 *     responses:
 *       200:
 *         description: Commentaire créé
 */
router.post('/api/comment/new', authMiddleware, commentCreate);

/**
 * @swagger
 * /api/comment/edit/{id}:
 *   patch:
 *     summary: Modifier un commentaire
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Commentaire mis à jour"
 *     responses:
 *       200:
 *         description: Commentaire modifié
 */
router.patch('/api/comment/edit/:id', authMiddleware, commentEdit);

/**
 * @swagger
 * /api/comment/delete/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé
 */
router.delete('/api/comment/delete/:id', authMiddleware, commentDelete);

export default router;
