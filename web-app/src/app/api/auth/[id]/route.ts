import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("Endpoint hit ");

  try {
    const { id } = await params;

    const userProfile = await client.user.findUnique({
      where: {
        clerkid: id,
      },
      include: {
        studio: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (userProfile)
      return NextResponse.json({ status: 200, user: userProfile });

    const clerkUserInstance = await clerkClient();
    const clerkUser = await clerkUserInstance.users.getUser(id);

    const createUser = await client.user.create({
      data: {
        clerkid: params.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstname: clerkUser.firstName,
        lastname: clerkUser.lastName,
        studio: {
          create: {},
        },
        workspace: {
          create: {
            name: `${clerkUser.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
        subscription: {
          create: {},
        },
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (createUser) return NextResponse.json({ status: 200, user: createUser });
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log(error);
  }
}
