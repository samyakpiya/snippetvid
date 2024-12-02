import { z } from "zod";
import dotenv from "dotenv";

const envSchema = z.object({
  OPEN_AI_KEY: z.string(),
  ACCESS_KEY: z.string(),
  SECRET_KEY: z.string(),
  BUCKET_REGION: z.string(),
  BUCKET_NAME: z.string(),
  ELECTRON_HOST: z.string(),
  NEXT_API_HOST: z.string(),
});

dotenv.config();
export const env = envSchema.parse(process.env);
