import { Request, Response, NextFunction } from 'express';
import Tag from '../models/tag.model';
import { ITagRequest } from '../types/tag.types';
import { Types } from "mongoose";

export const tagCreate = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { body, user } = req;
    const tags = await Tag.find({ title: body.name }).exec();

    if (tags) {
      body.slug = body.name + tags.length;
    } else {
      body.slug = body.name;
    }
    body.createdAt = new Date();
    body.publishedAt = new Date();
    body.author = user?.userId;
    const tag = new Tag(body);
    const savedTag = await tag.save();

    res.status(201).json({
      success: true,
      data: savedTag,
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

export const tagDelete = async (
  req: Request<{ id: string }, {}, ITagRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
    try {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).json({ success: false, message: "ID manquant." });
        }
    
        const objectId = new Types.ObjectId(id);
    
        const deleteTag = await Tag.findByIdAndDelete(objectId);
    
        if (!deleteTag) {
            return res.status(404).json({ success: false, message: "Tag non trouvé." });
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

export const listTag = async (
  req: Request<{ id: string }, {}, ITagRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const tags = await Tag.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name email");

      res.status(200).json({
        success: true,
        data: tags,
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

export const tagEdit = async (
  req: Request<{ id: string }, {}, ITagRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { body } = req;

    const tag = await Tag.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!tag) {
      res.status(404).json({
        success: false,
        message: "Tag non trouvé."
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: tag,
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