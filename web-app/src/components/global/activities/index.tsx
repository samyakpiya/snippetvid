import CommentForm from "@/components/forms/comment-form";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import CommentCard from "../comment-card";
import { getVideoComments } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  const { data } = useQuery({
    queryKey: ["video-comments"],
    queryFn: () => getVideoComments(videoId),
  });

  let comments;
  if (data && data.data) {
    comments = data.data;
  }

  return (
    <TabsContent value="Activity">
      <div className="flex flex-col gap-4 py-2">
        <CommentForm author={author} videoId={videoId} />
        {comments?.map((comment) => (
          <CommentCard
            comment={comment.comment}
            key={comment.id}
            author={{
              image: comment.User?.image!,
              firstname: comment.User?.firstname!,
              lastname: comment.User?.lastname!,
            }}
            videoId={videoId}
            reply={comment.reply}
            commentId={comment.id}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default Activities;
