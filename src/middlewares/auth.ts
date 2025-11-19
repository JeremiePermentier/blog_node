import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwtServices";
import { JwtPayload as JwtPayloadLib } from "jsonwebtoken"; // renomme l'import

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
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.replace("Bearer ", "");
    const decoded = (await verifyToken(token)) as unknown as JwtPayloadLib;

    if (!decoded || typeof (decoded as any).userId !== "string") {
      return res.sendStatus(401);
    }

    req.user = { userId: (decoded as any).userId };
    next();
  } catch {
    return res.sendStatus(401);
  }
}
