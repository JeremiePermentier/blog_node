import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../services/jwtServices';

export const login = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  const token = await generateToken({ userId: 1 });
  res.json({ token });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      res.status(400).json({
        success: false,
        errors,
      });
    } else {
      next(err);
    }
  };
};