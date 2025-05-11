import ErrorPage from "@/components/Layout/ErrorPage";
import Settings from "@/components/Settings/Settings";
import { getSettingsUser } from "@/lib/actions/user";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import fakeSettings from "@/fake-data/fake-settings.json";
import { SettingsUser } from "@/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getCurrentUser();

  if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true") {
    return <Settings user={fakeSettings as unknown as SettingsUser} />;
  }

  if (!session) {
    return redirect("/login?callbackUrl=/settings");
  }

  const { success, user, message } = await getSettingsUser();
  if (!success || !user) {
    return <ErrorPage message={message} />;
  }

  return <Settings user={user} />;
}
