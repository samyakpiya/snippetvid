import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import { Loader } from "@/components/global/Loader";
import { useEffect, useState } from "react";
import { useMediaSources } from "@/hooks/useMediaSources";
import MediaConfiguration from "@/components/global/MediaConfiguration";

const Widget = () => {
  const [profile, setProfile] = useState<{
    status: number;
    user:
      | ({
          subscription: {
            plan: "PRO" | "FREE";
          } | null;
          studio: {
            id: string;
            screen: string | null;
            mic: string | null;
            preset: "HD" | "SD";
            camera: string | null;
            userId: string | null;
          } | null;
        } & {
          id: string;
          email: string;
          firstname: string | null;
          lastname: string | null;
          createdAt: Date;
          clerkid: string;
        })
      | null;
  } | null>(null);

  const { user } = useUser();
  const { state, fetchMediaResources } = useMediaSources();

  useEffect(() => {
    if (user && user.id) {
      console.log("Fetching user data for:", user.id);
      window.ipcRenderer
        .invoke("fetch-user-data", user.id)
        .then((p) => {
          console.log("Received profile data:", p);
          setProfile(p);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }

    fetchMediaResources();
  }, [user]);

  return (
    <div className="p-5">
      <ClerkLoading>
        <div className="h-full flex justify-center items-center">
          <Loader />
        </div>
      </ClerkLoading>

      <SignedIn>
        {profile ? (
          <MediaConfiguration state={state} user={profile.user} />
        ) : (
          <MediaConfiguration state={state} />
        )}
      </SignedIn>
    </div>
  );
};

export default Widget;
