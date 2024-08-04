import Login from "@/components/Auth/Login";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function page() {
  const session = await getCurrentUser();

  if (session) {
    return notFound();
  }
  
  return (
    <div className="flex justify-center items-center h-full">
      <Login type="register" />
    </div>
  );
}
