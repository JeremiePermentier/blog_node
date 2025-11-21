import { Schema, model, Document } from "mongoose";
import { ITagBase } from "../types/tag.types";

export interface ITag extends ITagBase, Document {}

const TagSchema = new Schema<ITag>({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, required: true},
    published: { type: Boolean, default: false, required: true },
    publishedAt: { type: Date, required: true},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export default model<ITag>("Tag", TagSchema);