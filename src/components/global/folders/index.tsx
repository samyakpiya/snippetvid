"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Folder as FolderIcon } from "lucide-react";
import React from "react";
import Folder from "@/components/global/folders/folder";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useQuery } from "@tanstack/react-query";
import { useMutationDataState } from "@/hooks/useMutationData";
import { StringifyOptions } from "querystring";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
  workspaceId: string;
};

export type FoldersProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId: string | null;
  })[];
};

const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch();

  // get folders
  const { data, isFetched } = useQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  const { latestVariables } = useMutationDataState(["create-folder"]);

  const { data: folders, status } = data as FoldersProps;

  if (isFetched && folders) {
    dispatch(
      FOLDERS({
        folders: folders,
      })
    );
  }

  // optimistic variable ==
  // WIP: add the classnames for the folder based on success response

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderIcon />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">See All</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn("flex items-center gap-4 overlfow-x-auto w-full", {
          "justify-center": status !== 200,
        })}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
              />
            )}
            {folders.map((folder) => (
              <Folder
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
