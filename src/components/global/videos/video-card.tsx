import { Folder, User } from "@prisma/client";
import React from "react";
import Loader from "@/components/global/loader";
import CardMenu from "@/components/global/videos/menu";

import CopyLink from "./copy-link";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Dot, Share2, User as UserIcon } from "lucide-react";

type Props = {
  workspaceId: string;
  User: Pick<User, "firstname" | "lastname" | "image"> | null;
  id: string;
  Folder: Pick<Folder, "id" | "name"> | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
};

const VideoCard = ({
  User,
  id,
  Folder,
  createdAt,
  title,
  source,
  processing,
  workspaceId,
}: Props) => {
  // WIP: Wire up date
  const daysAgo = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <Loader
      state={processing}
      className="bg-[#171717 flex justify-center items-center border-[1px] border-[#252525] rounded-xl"
    >
      <div className=" group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
          <CardMenu
            currentFolderName={Folder?.name}
            videoId={id}
            currentWorkspaceId={workspaceId}
            currentFolder={Folder?.id}
          />
          <CopyLink
            variant="ghost"
            className="p-[5px] h-5 hover:bg-[#252525] bg-transparent"
            videoId={id}
          />
        </div>
        <Link
          href={`/preview/${id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-2 z-20">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">{title}</h2>

            <div className="flex gap-x-2 items-center mt-4">
              <Avatar className="size-8">
                <AvatarImage src={User?.image as string}></AvatarImage>
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-xs text-[#BDBDBD]">
                  {User?.firstname} {User?.lastname}
                </p>
                <p className="text-[#707070] text-xs flex items-center">
                  <Dot /> {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                </p>
              </div>
            </div>
            <div>
              <span className="flex gap-x-1 items-center">
                <Share2 fill="#9d9d9d" className="text-[#9d9d9d]" size={12} />
                <p className="text-xs text-[#9d9d9d] capitalize">
                  {User?.firstname}'s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
