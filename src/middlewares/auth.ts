import { JWTPayload } from "jose";
import { verifyToken } from "../services/jwtServices";

export async function authMiddleware(req: any, res: any, next: () => void) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  req.user = await verifyToken(token);
  next();
}
