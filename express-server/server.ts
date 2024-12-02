import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { Readable } from "stream";
import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import axios from "axios";
import { env } from "./config/environment";
import { openai, generateTitleAndSummary } from "./services/openai.service";
import { uploadToS3 } from "./services/s3.service";

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: [env.ELECTRON_HOST, "app://."],
    methods: ["GET", "POST"],
  },
});

const uploadDir = path.join(__dirname, "temp_upload");

async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir);
  }
}

interface VideoChunkData {
  filename: string;
  chunks: Uint8Array[];
}

interface ProcessVideoData {
  filename: string;
  userId: string;
}

async function handleVideoProcessing(userId: string, filename: string) {
  try {
    console.log(
      `Starting video processing for user: ${userId}, file: ${filename}`
    );
    const filePath = path.join(uploadDir, filename);
    const file = await fs.readFile(filePath);

    const processing = await axios.post(
      `${env.NEXT_API_HOST}/recording/${userId}/processing`,
      { filename }
    );

    if (processing.data.status !== 200) {
      console.error("Failed to create processing file");
      throw new Error("Failed to create processing file");
    }
    console.log(
      `Processing file created for user: ${userId}, file: ${filename}`
    );

    const uploaded = await uploadToS3(filename, file);
    if (!uploaded) {
      console.error("Failed to upload to S3");
      throw new Error("Failed to upload to S3");
    }
    console.log(`File uploaded to S3 for user: ${userId}, file: ${filename}`);

    if (processing.data.plan === "PRO") {
      const stats = await fs.stat(filePath);
      if (stats.size < 25_000_000) {
        console.log(
          `File size is under 25MB, starting transcription for file: ${filename}`
        );
        const transcription = await openai.audio.transcriptions.create({
          file: createReadStream(filePath),
          model: "whisper-1",
          response_format: "text",
        });

        const titleAndSummary = await generateTitleAndSummary(transcription);
        console.log(
          `Transcription and summary generated for file: ${filename}`
        );

        await axios.post(
          `${env.NEXT_API_HOST}/recording/${userId}/transcribe`,
          {
            filename,
            content: JSON.stringify(titleAndSummary),
            transcript: transcription,
          }
        );
        console.log(`Transcription data sent for file: ${filename}`);
      }
    }

    await axios.post(`${env.NEXT_API_HOST}/recording/${userId}/complete`, {
      filename,
    });
    console.log(
      `Video processing complete for user: ${userId}, file: ${filename}`
    );

    await fs.unlink(filePath);
    console.log(`Temporary file deleted for file: ${filename}`);
  } catch (error) {
    console.error("Error processing video:", error);
    // Implement error handling/notification
  }
}

// Replace the top-level await with an IIFE
(async function startServer() {
  try {
    await ensureUploadDir();
    console.log("Upload directory ensured");

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      const chunks: BlobPart[] = [];

      socket.on("video-chunks", async (data) => {
        console.log(`Received video chunks for file: ${data.filename}`);
        chunks.push(data.chunks);
        const blob = new Blob(chunks, { type: "video/webm; codecs=vp9" });
        const buffer = Buffer.from(await blob.arrayBuffer());

        const filePath = path.join(uploadDir, data.filename);
        const writeStream = createWriteStream(filePath);
        Readable.from(buffer).pipe(writeStream);
        console.log(`Video chunks written to file: ${data.filename}`);
      });

      socket.on("process-video", async (data: ProcessVideoData) => {
        console.log(
          `Processing video for user: ${data.userId}, file: ${data.filename}`
        );
        chunks.length = 0; // Clear chunks
        await handleVideoProcessing(data.userId, data.filename);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });

    server.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
