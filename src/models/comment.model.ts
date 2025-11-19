import { Schema, model, Document } from "mongoose";
import { ICommentBase } from "../types/comment.types";

export interface Icomment extends ICommentBase, Document {}

const CommentSchema = new Schema<Icomment>({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
});

export default model<Icomment>("Comment", CommentSchema);