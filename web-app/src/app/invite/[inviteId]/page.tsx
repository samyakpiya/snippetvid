import { acceptInvite } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = {
  params: {
    inviteId: string;
  };
};

const page = async ({ params }: Props) => {
  const { inviteId } = await params;

  const invite = await acceptInvite(inviteId);

  if (invite.status === 404) return redirect("/auth/sign-in");

  if (invite.status === 401) {
    return (
      <div className="h-screen container flex flex-col gap-y-2 justify-center">
        <h2 className="text-6xl font-bold text-white">Not Authorized</h2>
        <p>You are not authorized to accept this invite</p>
      </div>
    );
  }

  if (invite.status === 200) return redirect("/auth/callback");

  return <div>page</div>;
};

export default page;
