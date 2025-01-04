import ErrorPage from "@/components/Layout/ErrorPage";
import Profile from "@/components/Profile/Profile";
import { getProfile } from "@/lib/actions/profile";
import { notFound } from "next/navigation";

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  
  const {success, profile , message} = await getProfile({ username });
  
  
  if (!profile || !success) {
    return <ErrorPage message={message} />;
    }

  return <Profile profile={profile} />;
}
