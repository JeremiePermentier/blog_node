import { Request, Response, NextFunction } from 'express';
import Post from '../models/post.model';
import Comment from '../models/comment.model';
import { IPostRequest } from '../types/post.types';
import { Types } from "mongoose";

interface MyJwtPayload {
  userId: string;
}

interface AuthRequest<T = any> extends Request {
  body: T;
  user?: MyJwtPayload;
}

export const postDelete = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID manquant." });
    }

    const objectId = new Types.ObjectId(id);

    const deletePost = await Post.findByIdAndDelete(objectId);

    if (!deletePost) {
      return res.status(404).json({ success: false, message: "Post non trouvé." });
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map((key) => err.errors[key].message);
      return res.status(400).json({ success: false, errors });
    }
    next(err);
  }
};

export const postEdit = async (
  req: Request<{ id: string }, {}, IPostRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPost) {
      res.status(404).json({
        success: false,
        message: "Post non trouvé."
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      res.status(400).json({
        success: false,
        errors,
      });
    } else {
      next(err);
    }
  };
};

export const postCreate = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body, user } = req;
    console.log(user)
    const posts = await Post.find({ title: body.title }).exec();

    if (posts.length > 0) {
      body.slug = `${body.title}-${posts.length}`;
    } else {
      body.slug = body.title;
    }

    if (req.file) {
      body.coverImage = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
    }

    body.publishedAt = new Date();

    body.author = user?.userId;
    
    const post = new Post(body);
    const savedPost = await post.save();

    res.status(201).json({
      success: true,
      data: savedPost,
    });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      res.status(400).json({
        success: false,
        errors,
      });
    } else {
      next(err);
    }
  };
};


export const listPost = async (
  req: Request<{}, {}, IPostRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email");

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      res.status(400).json({
        success: false,
        errors,
      });
    } else {
      next(err);
    }
  }
};

export const getPost = async (
  req: Request<{ id: string }, {}, IPostRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const post = await Post.findById(id);
      const comments = await Comment.find({ post: id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const totalComments = await Comment.countDocuments({ postId: id });

        res.status(200).json({
          success: true,
          data: {
            ...post?.toObject(),
            comments: {
              page,
              limit,
              totalPages: Math.ceil(totalComments / limit),
              totalComments,
              data: comments
            }
          }
        });
  } catch (err: any) {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        );
        res.status(400).json({
          success: false,
          errors,
        });
      } else {
        next(err);
      }
  };
};