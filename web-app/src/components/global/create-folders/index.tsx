"use client";

import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/useCreateFolders";
import { FolderPlus } from "lucide-react";
import React from "react";

type Props = {
  workspaceId: string;
};

const CreateFolders = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);

  // WIP: add create folders
  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#1d1d1d] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
    >
      <FolderPlus />
      Create A Folder
    </Button>
  );
};

export default CreateFolders;
