import mongoose, { Document } from "mongoose";

export interface ITagBase {
    name: string;
    slug: string;
    author: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    published: Boolean;
    publishedAt: Date;
    posts: [mongoose.Schema.Types.ObjectId];
}

export interface ITagRequest extends ITagBase {}
export interface ITagDocument extends ITagBase, Document {}