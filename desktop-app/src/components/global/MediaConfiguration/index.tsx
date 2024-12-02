import { SourceDeviceStateProps } from "@/hooks/useMediaSources";
import { useStudioSettings } from "@/hooks/useStudioSettings";
import { Loader } from "@/components/global/Loader";
import { Camera, Headphones, Monitor, Settings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  state: SourceDeviceStateProps;
  user:
    | ({
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        studio: {
          id: string;
          screen: string | null;
          mic: string | null;
          camera: string | null;
          preset: "HD" | "SD";
          userId: string | null;
        } | null;
      } & {
        id: string;
        email: string;
        firstname: string | null;
        lastname: string | null;
        createdAt: Date;
        clerkid: string;
      })
    | null;
};

const MediaConfiguration = ({ state, user }: Props) => {
  const activeScreen = state.displays?.find(
    (screen) => screen.id === user?.studio?.screen
  );

  const activeAudio = state.audioInputs?.find(
    (device) => device.deviceId === user?.studio?.mic
  );

  const activeCamera = state.cameras?.[0];

  const { isPending, register } = useStudioSettings(
    user!.id,
    user?.studio?.screen || state.displays?.[0]?.id,
    user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
    user?.studio?.preset,
    user?.subscription?.plan,
    user?.studio?.camera || state.cameras?.[0]?.deviceId
  );

  return (
    <form className="flex h-full relative w-full flex-col gap-y-6 text-white">
      {isPending && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-center rounded-lg">
          <Loader />
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Monitor className="h-6 w-6 text-muted-foreground" />
          <Select
            {...register("screen")}
            defaultValue={activeScreen?.id}
            disabled
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={activeScreen?.name} />
            </SelectTrigger>
            <SelectContent>
              {state.displays?.map((display) => (
                <SelectItem
                  key={display.id}
                  value={display.id}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  {display.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Camera className="h-6 w-6 text-muted-foreground" />
          <Select
            {...register("camera")}
            defaultValue={activeCamera?.deviceId}
            onValueChange={(value) =>
              window.ipcRenderer.send("cam-selected", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select camera" />
            </SelectTrigger>
            <SelectContent>
              {state.cameras?.map((camera) => (
                <SelectItem
                  key={camera.deviceId}
                  value={camera.deviceId}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  {camera.label || `Camera ${camera.deviceId.slice(-4)}...`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Headphones className="h-6 w-6 text-muted-foreground" />
          <Select {...register("audio")} defaultValue={activeAudio?.deviceId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select audio input" />
            </SelectTrigger>
            <SelectContent>
              {state.audioInputs?.map((device) => (
                <SelectItem
                  key={device.deviceId}
                  value={device.deviceId}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  {device.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Settings2 className="h-6 w-6 text-muted-foreground" />
          <Select
            {...register("preset")}
            defaultValue={user?.studio?.preset || "SD"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="HD"
                disabled={user?.subscription?.plan === "FREE"}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                1080p{" "}
                {user?.subscription?.plan === "FREE" && "(Upgrade to PRO plan)"}
              </SelectItem>
              <SelectItem
                value="SD"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                720p
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default MediaConfiguration;
