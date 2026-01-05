import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { secret } from "../config/secret";

export async function generateToken(
  payload: JWTPayload | undefined,
  expiresIn: string = "2h"   // valeur par défaut = compatibilité
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function generateRefreshToken(
  payload: JWTPayload | undefined,
  expiresIn: string = "7d"
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyToken<T>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, secret);
  return payload as T;
}