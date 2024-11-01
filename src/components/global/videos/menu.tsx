import React from "react";
import Modal from "@/components/global/modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "@/components/forms/change-video-location";

type Props = {
  videoId: string;
  currentWorkspaceId?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  currentWorkspaceId,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2 hover:bg-[#252525] rounded-xl"
      title="Move to new Workspace/Folder"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      trigger={<Move size={20} fill="#a4a4a4" className="text-[#a4a4a4]" />}
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentWorkspaceId={currentWorkspaceId}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default CardMenu;
