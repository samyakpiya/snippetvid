"use server";

import { client } from "@/lib/prisma";

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) return { status: 200, data: folder };

    return { status: 400, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};
