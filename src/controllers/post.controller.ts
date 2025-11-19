import { Request, Response, NextFunction } from 'express';
import Post from '../models/post.model';
import { IPostRequest } from '../types/post.types';
import { Types } from "mongoose";

export const postDelete = async (
  req: Request<{ id: string }, {}, IPostRequest>,
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
  req: Request<{}, {}, IPostRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const posts = await Post.find({ title: body.title }).exec();

    if (posts) {
      body.slug = body.title + posts.length;
    } else {
      body.slug = body.title;
    }
    const post = new Post(body);
    const savedPost = await post.save();

    res.status(201).json({
      success: true,
      data: savedPost,
    });
  } catch (err: any) {
    console.log(err)
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
    const posts = await Post.find({}).exec();

    res.status(200).json({
      success: true,
      data: posts,
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