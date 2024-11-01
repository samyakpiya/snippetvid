import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useFolders";

type Props = {
  videoId: string;
  currentWorkspaceId?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentWorkspaceId,
  currentFolder,
  currentFolderName,
}: Props) => {
  // WIP: Wire up the use move folder
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  } = useMoveVideos(videoId, currentWorkspaceId!);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((f) => f.id === currentWorkspaceId);

  return (
    <form className="flex flex-col gap-y-5">
      <div className="border-[1px] roudned-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
        {workspace && (
          <p className="text-[#a4a4a4]">{workspace.name} Workspace</p>
        )}
        <p className="text-[#a4a4a4] text-sm">This video has no folder </p>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-xs">Workspace</p>
          <Select>
            <SelectTrigger>Select workspace</SelectTrigger>
            <SelectContent>
              <SelectItem value="abcdefg">{} workspace</SelectItem>
            </SelectContent>
          </Select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
