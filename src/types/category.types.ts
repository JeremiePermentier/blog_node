import mongoose, { Document } from "mongoose";

export interface ICategoryBase {
    name: string;
    slug: string;
    author: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    published: Boolean;
    publishedAt: Date;
    posts: [mongoose.Schema.Types.ObjectId];
}

export interface ICategoryRequest extends ICategoryBase {}
export interface ICategoryDocument extends ICategoryBase, Document {}