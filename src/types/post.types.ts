import mongoose, { Document } from "mongoose";

export interface IPostBase {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  author: mongoose.Schema.Types.ObjectId,
  published: Boolean,
  publishedAt: Date
}

export interface IPostRequest extends IPostBase {}
export interface IPostDocument extends IPostBase, Document {}