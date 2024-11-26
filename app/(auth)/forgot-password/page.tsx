import ForgotPassword from "@/components/Auth/forgotPasswordForm";
import { TokenHasExpired } from "@/lib/actions/auth/token-expires";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page({searchParams}: { searchParams: { [key: string]: string | string[] | undefined }}) {
  const session = await getCurrentUser();

  
const token =  searchParams && searchParams.token
  if(token && typeof token === 'string')   {

    const hasExpired = await  TokenHasExpired(token)

    
    if(hasExpired) {
      if (!session) {
        return redirect('/login')
      } 
      return redirect('/')
    }
    
  }
  
  if (!session) {
    redirect('/login')
  }
  
  return (
    <div className="flex justify-center items-center h-full">
     <ForgotPassword />
    </div>
  );
}
