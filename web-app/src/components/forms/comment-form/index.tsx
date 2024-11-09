"use client";

import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useVideoComment } from "@/hooks/useVideo";
import { useZodForm } from "@/hooks/useZodForm";
import { Send, X } from "lucide-react";

type Props = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
};

const CommentForm = ({ videoId, commentId, author }: Props) => {
  const { form, errors, isPending, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId
  );

  return (
    <Form {...form}>
      <form className="relative w-full" onSubmit={onFormSubmit}>
        <FormGenerator
          register={register}
          errors={errors}
          placeholder={`Respond to ${author}...`}
          name="comment"
          inputType="input"
          lines={8}
          type="text"
        />
        <Button
          className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent"
          type="submit"
        >
          <Loader state={isPending}>
            <Send
              className="text-white/50 cursor-pointer hover:text-white/80"
              size={18}
            />
          </Loader>
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
