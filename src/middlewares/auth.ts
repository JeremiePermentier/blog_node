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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = await verifyToken(token);

    if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
      return res.status(401).json({ message: "Token invalide" });
    }

    req.user = { userId: (decoded as any).userId };
    next();

  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
}
