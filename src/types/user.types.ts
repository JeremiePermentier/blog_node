import mongoose, { Document } from "mongoose";

export interface IUserBase {
  username: string;
  email: string;
  passwordHash: string;
  role: string;
}

export interface IUserRequest extends IUserBase {}
export interface IUserDocument extends IUserBase, Document {}