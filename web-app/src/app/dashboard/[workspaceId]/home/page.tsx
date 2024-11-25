import { howToPost } from "@/actions/cloudways";
import { getWixContent } from "@/actions/wix";
import HowToPost from "@/components/global/how-to-post";
import VideoCard from "@/components/global/videos/video-card";
import React from "react";

const Home = async () => {
  const videos = await getWixContent();

  const post = await howToPost();

  console.log("post", post);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {videos.status === 200
        ? videos.data?.map((video) => (
            <VideoCard
              key={video.id}
              {...video}
              workspaceId={video.workSpaceId!}
            />
          ))
        : ""}
      <HowToPost title={post?.title} html={post?.content} />
    </div>
  );
};

export default Home;
