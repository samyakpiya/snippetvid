import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
    form,
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
    <Form {...form}>
      <form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
        <div className="border-[1px] roudned-xl p-5">
          <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
          {workspace && <p className="text-[#a4a4a4]">{workspace.name}</p>}

          <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
          {currentFolder ? (
            <p>{currentFolderName}</p>
          ) : (
            <p className="text-[#a4a4a4] text-sm">This video has no folder </p>
          )}
        </div>
        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
          <h2 className="text-xs text-[#a4a4a4]">To</h2>

          <FormField
            control={form.control}
            name="workspace_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a workspace" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {workspaces.map((space) => (
                      <SelectItem
                        key={space.id}
                        value={space.id}
                        className="text-[#a4a4a4]"
                      >
                        {space.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {isFetching ? (
            <Skeleton className="w-full h-[40px] rounded-xl" />
          ) : (
            <FormField
              control={form.control}
              name="folder_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folders in the workspace</FormLabel>
                  {isFolders && isFolders.length > 0 ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a folder" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isFolders.map((folder) => (
                          <SelectItem
                            className="text-[#a4a4a4]"
                            key={folder.id}
                            value={folder.id}
                          >
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    "This workspace has no folders."
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button>
          <Loader state={isPending} color="#000">
            Transfer
          </Loader>
        </Button>
      </form>
    </Form>
  );
};

export default ChangeVideoLocation;
