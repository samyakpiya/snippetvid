import { createFolder } from "@/actions/workspace";
import { useMutationData } from "@/hooks/useMutationData";

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(workspaceId),
    "workspace-folders"
  );

  const onCreateNewFolder = () =>
    mutate({ name: "Untitled", id: "optimistic-id" });

  return { onCreateNewFolder };
};
