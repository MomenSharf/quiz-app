import { SettingsUser } from "@/types";
import ProfileCard from "./ProfileCard";

export default function Settings({ user }: { user: SettingsUser }) {
  return (
    <div className="p-3">
      <ProfileCard user={user} />
    </div>
  );
}
