import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import Loader from "../loader";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Download,
  File,
  FileTextIcon,
  Pencil,
  StarsIcon,
  Video,
} from "lucide-react";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan, trial, videoId }: Props) => {
  // Are they on a free plan?
  // have they alread tried the AI feature?
  // if not? Try button

  // useMutationData
  // serverAction titles and description

  // WIP: set the ai hook
  return (
    <TabsContent value="AI Tools">
      <div className="py-2 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8/12">
            <h2 className="text-3xl font-bold">AI Tools</h2>
            <p className="text-[#BDBDBD]">
              Taking your videos to the next <br /> step with the power of AI!
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Button className="mt-2 text-sm">
              <Loader state={false} color="#000">
                Try
              </Loader>
            </Button>
            {/* WIP: Pay button */}
            <Button className="mt-2 text-sm" variant="secondary">
              <Loader state={false} color="#000">
                Pay
              </Loader>
            </Button>
            <Button className="mt-2 text-sm" variant="secondary">
              <Loader state={false} color="#000">
                Generate
              </Loader>
            </Button>
          </div>
        </div>

        <div className="border-[1px] rounded-xl p-4 gap-4 flex flex-col bg-[#1b0f1b7f]">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#a22fe0]">
              Snippet Vid AI
            </h2>
            <StarsIcon color="#a22fe0" fill="#a22fe0" />
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
              <Pencil color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">Summay</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
              <FileTextIcon color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">Summay</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
              <Bot color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">Summay</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
        </div>

        {/* {plan === "FREE" ? (
          !trial ? (
            
          ) : (
            ""
          )
        ) : (
          ""
        )} */}
      </div>
    </TabsContent>
  );
};

export default AiTools;
