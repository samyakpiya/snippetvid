"use client";

import { getAllUserVideos } from "@/actions/workspace";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import VideoCard from "@/components/global/videos/video-card";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  const { data: videoData } = useQuery({
    queryKey: [videosKey],
    queryFn: () => getAllUserVideos(folderId),
  });

  const videoStatus = videoData?.status;
  const videos = videoData?.data;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoIcon />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {videoStatus === 200 ? (
          videos?.map((video) => (
            <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
          ))
        ) : (
          <p className="text-[#BDBDBD]">No videos in workspace.</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
