import { updateStudioSettingsSchema } from "@/schemas/studio-settings.schema";
import { useZodForm } from "./useZodForm";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useStudioSettings = (
  id: string,
  screen?: string | null,
  audio?: string | null,
  preset?: "HD" | "SD",
  plan?: "PRO" | "FREE",
  camera?: string | null
) => {
  const [onPreset, setPreset] = useState<"HD" | "SD" | undefined>();

  const { register, watch } = useZodForm(updateStudioSettingsSchema, {
    screen: screen!,
    audio: audio!,
    preset: preset!,
    camera: camera!,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-studio"],
    mutationFn: (data: {
      screen: string;
      id: string;
      audio: string;
      preset: "HD" | "SD";
      camera: string;
    }) =>
      window.ipcRenderer.invoke(
        "update-studio-settings",
        data.id,
        data.screen,
        data.audio,
        data.preset,
        data.camera
      ),
    onSuccess: (data) => {
      toast({
        title: data.status === 200 ? "Success" : "Error",
        description: data.message,
      });
    },
  });

  useEffect(() => {
    if (screen && audio) {
      window.ipcRenderer.send("media-sources", {
        screen,
        id,
        audio,
        preset,
        plan,
      });
    }
  }, [screen, audio, id, plan, preset]);

  useEffect(() => {
    const subscribe = watch((values) => {
      setPreset(values.preset);
      mutate({
        screen: values.screen!,
        id,
        audio: values.audio!,
        preset: values.preset!,
        camera: values.camera!,
      });
      window.ipcRenderer.send("media-sources", {
        screen: values.screen,
        id,
        audio: values.audio,
        preset: values.preset,
        camera: values.camera,
        plan,
      });
    });

    return () => subscribe.unsubscribe();
  }, [watch, id, mutate, plan]);

  return { register, isPending, onPreset };
};
