import { createSecretKey } from "crypto";
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  throw new Error("⚠️ JWT_SECRET n’est pas défini dans le .env");
}

export const secret = createSecretKey(Buffer.from(process.env.JWT_SECRET));
