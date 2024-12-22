import RegisterForm from "@/components/Auth/RegisterForm";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const session = await getCurrentUser();

  if (session) {
    return redirect('/')
  }
  
  return (
    <div className="flex justify-center items-center h-full">
     <RegisterForm />
    </div>
  );
}
