import { Request, Response, NextFunction } from 'express';
import { ICommentRequest } from "../types/comment.types";
import Comment from '../models/comment.model';
import { Types } from 'mongoose';

export const commentCreate = async (
    req: Request<{}, {}, ICommentRequest>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { body } = req;
        const comment = new Comment(body);
        const savedComment = await comment.save();

        return res.status(201).json(savedComment);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      return res.status(400).json({
        success: false,
        errors,
      });
    } else {
      next(err);
    }
  };
};

export const commentEdit = async (
    req: Request<{ id: string }, {}, ICommentRequest>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
    const { id } = req.params;
    const { body } = req;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedComment) {
      res.status(404).json({
        success: false,
        message: "Post non trouvé."
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedComment,
    });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      return res.status(400).json({
        success: false,
        errors,
      });
    } else {
      next(err);
    }
  };
};

export const commentDelete = async (
  req: Request<{ id: string }, {}, ICommentRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID manquant." });
    }

    const objectId = new Types.ObjectId(id);

    const deletePost = await Comment.findByIdAndDelete(objectId);

    if (!deletePost) {
      return res.status(404).json({ success: false, message: "Commentaire non trouvé." });
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