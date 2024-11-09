import { useQuery } from "@tanstack/react-query";
import { useMutationData } from "./useMutationData";
import { createCommentSchema } from "@/components/forms/comment-form/schema";
import { useZodForm } from "@/hooks/useZodForm";
import { createCommentAndReply, getUserProfile } from "@/actions/user";

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  const { status, data: user } = data as {
    status: number;
    data: { id: string; image: string };
  };

  const { isPending, mutate } = useMutationData(
    ["new-comment"],
    (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
    "video-comments",
    () => reset()
  );

  const { form, register, onFormSubmit, errors, reset } = useZodForm(
    createCommentSchema,
    mutate
  );

  return { form, register, errors, onFormSubmit, reset, isPending };
};
