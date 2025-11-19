import mongoose, { Document } from "mongoose";

export interface ICommentBase {
    post: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    content: string;
}

export interface ICommentRequest extends ICommentBase {}
export interface ICommentDocument extends ICommentBase, Document {}