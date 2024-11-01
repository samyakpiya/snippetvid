"use client";

import { getFolderInfo } from "@/actions/folder";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  folderId: string;
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo(folderId),
  });

  const folder = data?.data;

  return (
    <div className="flex items-center">
      <h2 className="text-[#BdBdBd] text-2xl">{folder?.name}</h2>
    </div>
  );
};

export default FolderInfo;
