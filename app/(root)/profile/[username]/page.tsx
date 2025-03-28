import ErrorPage from "@/components/Layout/ErrorPage";
import Profile from "@/components/Profile/Profile";
import { getProfile } from "@/lib/actions/profile";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import fakeProfile from "@/fake-data/fake-profile.json";
import { UserProfile } from "@/types";

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true") {
    return <Profile profile={fakeProfile as unknown as UserProfile} />;
  }
  const { success, profile, message } = await getProfile({ username });

  if (!profile || !success) {
    return <ErrorPage message={message} />;
  }

  return <Profile profile={profile} />;
}
