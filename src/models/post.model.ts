import { Schema, model, Document } from "mongoose";
import { IPostBase } from "../types/post.types";

export interface IPost extends IPostBase, Document {}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique:true, lowercase: true },
    content: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    published: { type: Boolean, default: false, required: true },
    publishedAt: { type: Date, required: true}
});

export default model<IPost>("Post", postSchema);