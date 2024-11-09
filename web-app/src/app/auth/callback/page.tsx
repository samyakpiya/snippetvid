import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = {};

const AuthCallbackPage = async (props: Props) => {
  // Authentication
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (auth.status === 403 || auth.status === 400 || auth.status === 500) {
    return redirect("/auth/sign-in");
  }
  // If account does not exist, create an account in the database
};

export default AuthCallbackPage;
