import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwtServices";

interface MyJwtPayload {
  userId: string;
}

interface AuthRequest extends Request {
  user?: MyJwtPayload;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.cookies) {
      return res.status(400).json({ message: "Cookies missing" });
    }

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "No access_token cookie found" });
    }

    const decoded = await verifyToken<MyJwtPayload>(token);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = { userId: decoded.userId };
    next();

  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
}
