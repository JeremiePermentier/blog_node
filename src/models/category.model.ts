import { Schema, model, Document } from "mongoose";
import { ICategoryBase } from "../types/category.types";

export interface ICategory extends ICategoryBase, Document {}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, required: true},
    published: { type: Boolean, default: false, required: true },
    publishedAt: { type: Date, required: true},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export default model<ICategory>("Category", categorySchema);