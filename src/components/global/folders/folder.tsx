"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/global/loader";
import { Folder as FolderIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  // WIP: Add loading states

  // optimistic
  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, data.name),
    "workspace-folders",
    Renamed
  );

  const { latestVariables } = useMutationDataState(["rename-folders"]);

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();

    Rename();
    // Rename functionality
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("updateFolderName reached");
    if (inputRef.current) {
      console.log("A");
      if (inputRef.current.value) {
        console.log("B");
        mutate({ name: inputRef.current.value, id });
      } else Renamed();
    }
  };

  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px]",
        {
          "opacity-60": optimistic,
        }
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              autoFocus
              onBlur={updateFolderName}
              defaultValue={name}
              className="h-6 w-[200px] border-none text-base text-neutral-300 bg-transparent p-0 focus:outline-none focus-visible:ring-0"
              ref={inputRef}
            />
          ) : (
            <p
              title={name}
              onClick={handleNameClick}
              className="h-6 text-base text-neutral-300 w-[200px] truncate"
            >
              {latestVariables &&
              latestVariables.status === "pending" &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
          )}

          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderIcon />
    </div>
  );
};

export default Folder;
