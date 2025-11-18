import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { secret } from "../config/secret";

export async function generateToken(payload: JWTPayload | undefined) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function verifyToken(token: string | Uint8Array<ArrayBufferLike>) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}