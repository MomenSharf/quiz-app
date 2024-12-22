import Settings from "@/components/Settings/Settings";
import { getSettingsUser } from "@/lib/actions/user";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const { success, user } = await getSettingsUser();
  if (!success || !user) {
    return "??";
  }
  return <Settings user={user} />;
}
