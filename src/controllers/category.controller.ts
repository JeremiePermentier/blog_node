import { Request, Response, NextFunction } from 'express';
import { ICategoryRequest } from '../types/category.types';
import { Types } from "mongoose";
import Category from '../models/category.model';

export const categoryDelete = async (
  req: Request<{ id: string }, {}, ICategoryRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
    try {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).json({ success: false, message: "ID manquant." });
        }
    
        const objectId = new Types.ObjectId(id);
    
        const deleteCategory = await Category.findByIdAndDelete(objectId);
    
        if (!deleteCategory) {
            return res.status(404).json({ success: false, message: "Categorie non trouvé." });
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

export const categoryCreate = async (
  req: Request<{ id: string }, {}, ICategoryRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { body } = req;
    const categories = await Category.find({ title: body.name }).exec();

    if (categories) {
      body.slug = body.name + categories.length;
    } else {
      body.slug = body.name;
    }
    const category = new Category(body);
    const savedCategory = await category.save();

    res.status(201).json({
      success: true,
      data: savedCategory,
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

export const listCategory = async (
  req: Request<{ id: string }, {}, ICategoryRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const categories = await Category.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name email");

      res.status(200).json({
        success: true,
        data: categories,
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

export const categoryEdit = async (
  req: Request<{ id: string }, {}, ICategoryRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { body } = req;

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Catégorie non trouvé."
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: category,
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