import { getPreviewVideo } from "@/actions/workspace";
import VideoPreview from "@/components/global/videos/preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  params: {
    videoId: string;
  };
};

const VideoPreviewPage = async ({ params }: Props) => {
  const { videoId } = await params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo(videoId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
};

export default VideoPreviewPage;
