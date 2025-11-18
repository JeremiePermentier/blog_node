import { Schema, model, Document } from "mongoose";
import { IUserBase } from "../types/user.types";

export interface IUser extends IUserBase, Document {}

const postSchema = new Schema<IUser>({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique:true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: 'user' }
});

export default model<IUser>("User", postSchema);