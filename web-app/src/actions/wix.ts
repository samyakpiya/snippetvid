"use server";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { client } from "@/lib/prisma";

export const getWixContent = async () => {
  try {
    const myWixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: process.env.WIX_OAUTH_KEY as string,
      }),
    });

    const videos = await myWixClient.items
      .queryDataItems({
        dataCollectionId: "snippetvid-videos",
      })
      .find();

    const videoIds = videos.items.map((v) => v.data?.title);

    const video = await client.video.findMany({
      where: {
        id: {
          in: videoIds,
        },
      },
      select: {
        id: true,
        createdAt: true,
        title: true,
        source: true,
        processing: true,
        workSpaceId: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (video && video.length > 0) {
      return { status: 200, data: video };
    }

    return { status: 404 };
  } catch (error) {
    console.log(error);
    return { status: 400 };
  }
};
