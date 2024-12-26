import { SettingsUser } from "@/types";
import ProfileCard from "./ProfileCard";
import SignOut from "../Auth/SignOut";
import SignOutCard from "./SignOutCard";

export default function Settings({ user }: { user: SettingsUser }) {
  return (
    <div className="p-3 flex flex-col gap-3">
      <ProfileCard user={user} />
      <SignOutCard />
    </div>
  );
}
