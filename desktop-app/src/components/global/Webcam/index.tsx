import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Webcam = () => {
  const camElement = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  const streamWebCam = async (deviceId?: string) => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: deviceId || undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (camElement.current) {
        camElement.current.srcObject = stream;
        await camElement.current.play();
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleCamSelected = (
      _event: Electron.IpcRendererEvent,
      camera: string
    ) => {
      setSelectedDevice(camera);
    };

    window.ipcRenderer.on("cam-selected", handleCamSelected);

    return () => {
      window.ipcRenderer.off("cam-selected", handleCamSelected);
    };
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      streamWebCam(selectedDevice);
    }
    return () => {
      if (camElement.current?.srcObject) {
        const tracks = (
          camElement.current.srcObject as MediaStream
        ).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [selectedDevice]);

  if (hasError) {
    return (
      <div className="size-32 rounded-full bg-neutral-800 flex items-center justify-center border border-red-500">
        <p className="text-red-500 text-xs text-center px-2">
          Failed to access camera
        </p>
      </div>
    );
  }

  return (
    <div className="draggable relative size-[150px] rounded-full overflow-hidden border-2 border-neutral-700">
      {isLoading && (
        <div className="absolute inset-0 bg-[#171717] flex items-center justify-center">
          <Loader2 className="size-6 text-neutral-400 animate-spin" />
        </div>
      )}
      <video
        ref={camElement}
        className={cn("size-full object-cover", isLoading && "opacity-0")}
        autoPlay
        playsInline
        muted
      />
    </div>
  );
};

export default Webcam;
