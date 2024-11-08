import { TabsContent } from "@/components/ui/tabs";
import React from "react";

type Props = {
  transcript: string;
};

const VideoTranscript = ({ transcript }: Props) => {
  return (
    <TabsContent value="Transcript">
      <div className="py-2">
        <p className="text-[#a7a7a7]">{transcript}</p>
      </div>
    </TabsContent>
  );
};

export default VideoTranscript;
