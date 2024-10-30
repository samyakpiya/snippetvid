"use client";

import { getWorkspaces } from "@/actions/workspace";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Modal from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import WorkspaceForm from "@/components/forms/workspace-form";

type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data: plan } = useQuery({
    queryKey: ["user-workspaces"],
    queryFn: getWorkspaces,
  });

  if (plan?.data?.subscription?.plan === "FREE") {
    return <></>;
  }

  if (plan?.data?.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
        trigger={
          <Button className="bg-[#1d1d1d] text-[#707070] flex items-center gap-2 py-6 px-4">
            <FolderPlus />
            Create a workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }

  return <div>CreateWorkspace</div>;
};

export default CreateWorkspace;
