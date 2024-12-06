import { onStopRecording, selectSources, StartRecording } from "@/lib/recorder";
import { cn, videoRecordingTime } from "@/lib/utils";
import { Pause, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const StudioTray = () => {
  const initialTime = new Date();

  // const [preview, setPreview] = useState(false);
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
        camera: string;
      }
    | undefined
  >(undefined);

  const clearTime = () => {
    setOnTimer("00:00:00");
    setCount(0);
  };

  window.ipcRenderer.on("profile-received", (_event, payload) => {
    console.log("payload of profile-received", payload);
    setOnSources(payload);
  });

  const videoElement = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   resizeWindow(preview);
  //   return () => resizeWindow(false);
  // }, [preview]);

  useEffect(() => {
    if (onSources && onSources.screen) {
      selectSources(onSources, videoElement);
      return () => {
        if (videoElement.current) {
          videoElement.current.srcObject = null;
        }
      };
    }
  }, [onSources]);

  useEffect(() => {
    if (!recording) return;

    const recordTimeInterval = setInterval(() => {
      const time = count + (new Date().getTime() - initialTime.getTime());
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
    <div className="bg-[#171717] border-2 border-neutral-700 flex flex-col rounded-3xl overflow-hidden size-full">
      {/* {preview && (
        <video
          autoPlay
          ref={videoElement}
          className="w-96 rounded-lg shadow-lg bg-black/90 self-end transition-all duration-300 ease-in-out hover:scale-105"
        ></video>
      )} */}
      <div className="rounded-full flex justify-between items-center size-full max-w-xl mx-auto bg-[#171717] backdrop-blur-sm draggable p-5">
        <div
          {...(onSources && {
            onClick: () => {
              setRecording(true);
              StartRecording(onSources);
            },
          })}
          className={cn(
            "size-[20px] non-draggable rounded-full cursor-pointer relative hover:opacity-80 transition-all duration-300 shadow-md",
            recording
              ? "bg-red-500  animate-pulse"
              : "bg-red-400  hover:bg-red-500"
          )}
        >
          {recording && (
            <span className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-white font-mono">
              {onTimer}
            </span>
          )}
        </div>

        {!recording ? (
          <Pause
            className="non-draggable opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            size={20}
            fill="white"
            stroke="none"
          />
        ) : (
          <Square
            size={20}
            className="non-draggable opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            fill="white"
            stroke="white"
            onClick={() => {
              setRecording(false);
              clearTime();
              onStopRecording();
            }}
          />
        )}

        {/* <Cast
          size={32}
          fill="white"
          className="non-draggable cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
          stroke="white"
          onClick={() => setPreview((prev) => !prev)}
        /> */}
      </div>
    </div>
  );
};

export default StudioTray;
