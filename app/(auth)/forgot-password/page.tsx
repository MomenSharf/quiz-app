import ForgotPassword from "@/components/Auth/forgotPasswordForm";
import { TokenHasExpired } from "@/lib/actions/auth/token-expires";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getCurrentUser();

  if(session) {
    return redirect('/')
  }
  
  return (
    <div className="flex justify-center items-center h-full">
     <ForgotPassword />
    </div>
  );
}
