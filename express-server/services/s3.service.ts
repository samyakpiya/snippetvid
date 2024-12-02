import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/environment";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
  },
  region: env.BUCKET_REGION,
});

export async function uploadToS3(key: string, file: Buffer): Promise<boolean> {
  const command = new PutObjectCommand({
    Key: key,
    Bucket: env.BUCKET_NAME,
    ContentType: "video/webm",
    Body: file,
  });

  const response = await s3Client.send(command);
  return response.$metadata.httpStatusCode === 200;
}
