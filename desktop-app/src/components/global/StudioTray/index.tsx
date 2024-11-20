import { onStopRecording, selectSources, StartRecording } from "@/lib/recorder";
import { cn, resizeWindow, videoRecordingTime } from "@/lib/utils";
import { Cast, Pause, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const StudioTray = () => {
  let initialTime = new Date();

  const [preview, setPreview] = useState(false);
  const [onTimer, setOnTimer] = useState("00:00:00");
  const [count, setCount] = useState(0);

  const [recording, setRecording] = useState(false);
  const [onSources, setOnSources] = useState<
    | {
        screen: string;
        id: string;
        audio: string;
        preset: "HD" | "SD";
        plan: "PRO" | "FREE";
      }
    | undefined
  >(undefined);

  const clearTime = () => {
    setOnTimer("00:00:00");
    setCount(0);
  };

  window.ipcRenderer.on("profile-received", (event, payload) => {
    console.log(event);
    setOnSources(payload);
  });

  const videoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    resizeWindow(preview);
    return () => resizeWindow(preview);
  }, []);

  useEffect(() => {
    if (onSources && onSources.screen) {
      selectSources(onSources, videoElement);
      return () => {
        selectSources(onSources, videoElement);
      };
    }
  }, [onSources]);

  useEffect(() => {
    if (!recording) return;

    const recordTimeInterval = setInterval(() => {
      let time = count + (new Date().getTime() - initialTime.getTime());
      setCount(time);

      const recordingTime = videoRecordingTime(time);

      if (onSources?.plan === "FREE" && recordingTime.minute === "05") {
        setRecording(false);
        clearTime();
        onStopRecording();
      }

      setOnTimer(recordingTime.length);

      if (time <= 0) {
        setOnTimer("00:00:00");
        clearInterval(recordTimeInterval);
      }
    }, 1);

    return () => clearInterval(recordTimeInterval);
  }, [recording]);

  return !onSources ? (
    <></>
  ) : (
    <div className="flex flex-col justify-end gap-y-5 h-screen">
      {preview && (
        <video
          autoPlay
          ref={videoElement}
          className="w-6/12 bg-white self-end"
        ></video>
      )}
      <div className="rounded-full flex justify-around items-center h-20 w-full border-2 bg-[#171717] draggable border-white/40">
        <div
          {...(onSources && {
            onClick: () => {
              setRecording(true);
              StartRecording(onSources);
            },
          })}
          className={cn(
            "non-draggable rounded-full cursor-pointer relative hover:opactiy-80",
            recording ? "bg-red-500 w-6 h-6" : "bg-red-400 w-8 h-8"
          )}
        >
          {recording && (
            <span className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-white">
              {onTimer}
            </span>
          )}
        </div>
        {!recording ? (
          <Pause
            className="non-draggable opactiy-50"
            size={32}
            fill="white"
            stroke="none"
          />
        ) : (
          <Square
            size={32}
            className="non-draggable opacity-50"
            fill="white"
            stroke="white"
            onClick={() => {
              setRecording(false);
              clearTime();
              onStopRecording();
            }}
          />
        )}
        <Cast
          size={32}
          fill="white"
          className="non-draggable cursor-pointer hover:opacity-60"
          stroke="white"
          onClick={() => setPreview((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default StudioTray;
