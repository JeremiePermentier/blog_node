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

    // Récupération de l'utilisateur
    const user = await User.findOne({ email });

    // Hash factice pour empêcher les attaques par timing
    const fakeHash = "$2b$10$abcdefghijklmnopqrstuv12345678901234567890123456";

    // Compare toujours le mot de passe, même si l'utilisateur n'existe pas
    const hashToCompare = user ? user.passwordHash : fakeHash;
    const valid = await bcrypt.compare(password, hashToCompare);

    // Message d’erreur générique (pas d’info sur l’existence du compte)
    if (!user || !valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Génération du token
    const accessToken = await generateToken(
      { userId: user._id?.toString() },
      "15m"
    );

    // Cookie sécurisé
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      id: user.id,
      username: user.username,
      email: user.email,
    });

  } catch (err) {
    // Erreur serveur
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({
      success: false,
      message,
    });
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
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      },
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
