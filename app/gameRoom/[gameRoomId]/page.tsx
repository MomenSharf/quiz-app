import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page({
  params: { gameRoomId },
}: {
  params: { gameRoomId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const { id, name } = session.user;

  return (
    <div>
      
    </div>
  );
}
