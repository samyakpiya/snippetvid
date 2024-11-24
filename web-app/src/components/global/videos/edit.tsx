import React from "react";
import Modal from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import EditVideoForm from "@/components/forms/edit-video";

type Props = { title: string; description: string; videoId: string };

const EditVideo = ({ title, description, videoId }: Props) => {
  return (
    <Modal
      title="Edit video details"
      description="You can update your video details here!"
      trigger={
        <Button variant="ghost">
          <Edit className="text-[#8c8b8b]" />
        </Button>
      }
    >
      {/* Challenge: Make the title and description elements clickable to rename instead of doing it via a modal */}
      <EditVideoForm
        title={title}
        description={description}
        videoId={videoId}
      />
    </Modal>
  );
};

export default EditVideo;
