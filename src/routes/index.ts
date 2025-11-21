import { Router } from 'express';
import { postCreate, listPost, postEdit, postDelete, getPost } from '../controllers/post.controller';
import { login, register } from '../controllers/login.controller';
import { authMiddleware } from '../middlewares/auth';
import { commentCreate, commentEdit, commentDelete } from '../controllers/comment.controller';
import { categoryCreate, categoryDelete, categoryEdit, listCategory } from '../controllers/category.controller';
import { listTag, tagCreate, tagDelete, tagEdit } from '../controllers/tag.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/v1/post/new:
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
router.post('/api/v1/post/new', authMiddleware, postCreate);

/**
 * @swagger
 * /api/v1/post/edit/{id}:
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
router.patch('/api/v1/post/edit/:id', authMiddleware, postEdit);

/**
 * @swagger
 * /api/v1/post/delete/{id}:
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
router.get('/api/v1/posts', authMiddleware, listPost);

/**
 * @swagger
 * /api/v1/post/{id}:
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
router.get('/api/v1/post/:id', authMiddleware, getPost);

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
router.post('/api/v1/users/register', register);

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
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé
 */
router.delete('/api/v1/comment/delete/:id', authMiddleware, commentDelete);

/**
 * @swagger
 * /api/v1/category/new:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Technologie"
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
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouvelle Technologie"
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
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie supprimée
 */
router.delete('/api/v1/category/delete/:id', authMiddleware, categoryDelete);
/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Lister toutes les catégories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catégories
 */
router.get('/api/v1/category', authMiddleware, listCategory);

/**
 * @swagger
 * /api/v1/tag/new:
 *   post:
 *     summary: Créer un nouveau tag
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "React"
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
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "VueJS"
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
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du tag
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
