import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../services/jwtServices';
import User from '../models/user.models';
import bcrypt from "bcrypt";
import { IUserRequest } from '../types/user.types';
import zxcvbn from "zxcvbn";

export const login = async (
  req: Request<{}, {}, IUserRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = await generateToken({ userId: user._id });

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ success: false, message: err.message });
    }

    return res.status(500).json({ success: false, message: "Unknown error" });
  }
};

export const register = async (
  req: Request<{}, {}, IUserRequest>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const result = zxcvbn(password);
    if (result.score < 3) {
      return res.status(400).json({
        success: false,
        message: "Password is too weak",
        suggestions: result.feedback.suggestions,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      passwordHash,
    });

    return res.status(201).json({
      success: true,
      data: user,
    });

  } catch (err: unknown) {
    if (typeof err === "object" && err !== null) {
      const errorObj = err as { [key: string]: any };

      if (errorObj.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      if (errorObj.name === "ValidationError" && errorObj.errors) {
        const errors = Object.values(errorObj.errors).map((e: any) => e.message);
        return res.status(400).json({ success: false, errors });
      }
    }

    next(err);
  }
};
