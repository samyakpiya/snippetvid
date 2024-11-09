# 📹 SnippetVid - Real-Time Personalized Video Recording and Streaming SaaS

SnippetVid is a SaaS product designed for freelancers, agency owners, and business owners to instantly record, save, and stream personalized videos. With real-time notifications and AI-powered features for generating titles, descriptions, summaries, and transcripts, SnippetVid helps users communicate efficiently and effectively without relying on third-party libraries.

## 🚀 Features

- **Instant Video Recording**: Record videos right from your desktop app using Electron.js.
- **Real-Time Streaming**: Videos are available for streaming instantly after recording.
- **Personalized Video Experience**: Tailor each video with personalized content.
- **AI-Powered**: Use AI to generate video titles, descriptions, summaries, and transcripts with Whisper AI and OpenAI.
- **Real-Time Notifications**: Receive notifications when your videos are watched.
- **Cross-Platform**: Available as a web app (Next.js) and a native desktop app (Electron.js).

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (Web app)
- **Authentication**: [Clerk](https://clerk.dev/) for user authentication and profile management.
- **Native App**: [Electron.js](https://www.electronjs.org/) for the cross-platform desktop app.
- **Recording API**: Media Stream API and Media Recorder to record video/audio.
- **Backend**: [Express.js](https://expressjs.com/) for handling recordings, file uploads, and video streaming.
- **Real-Time Communication**: [Socket.io](https://socket.io/) for real-time video buffer chunking.
- **Storage**: [AWS S3](https://aws.amazon.com/s3/) for storing recorded videos.
- **Video Streaming**: [AWS Cloudfront](https://aws.amazon.com/cloudfront/) for fast and scalable video streaming.
- **AI Features**:
  - [Whisper AI](https://openai.com/research/whisper) for transcription.
  - [OpenAI API](https://openai.com/) for generating video titles, descriptions, and summaries.
