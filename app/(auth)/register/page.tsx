import RegisterForm from "@/components/Auth/RegisterForm";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function page(props: {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
}) {
  const session = await getCurrentUser();

  if (session) {
    return redirect('/')
  }
  const searchParams = await props.searchParams;

  const callbackUrl = searchParams?.callbackUrl || "/";
  
  return (
    <div className="flex justify-center items-center h-full">
     <RegisterForm callbackUrl={callbackUrl} />
    </div>
  );
}
