import ForgotPassword from "@/components/Auth/forgotPasswordForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import VerifyEmailForm from "@/components/Auth/VerifyEmailForm";
import {  TokenHasExpired } from "@/lib/actions/auth/token-expires";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function page({searchParams}: { searchParams: { [key: string]: string | string[] | undefined }}) {
  const session = await getCurrentUser();

  if (session) {
    return redirect('/')
  }
const token =  searchParams && searchParams.token
  if(token && typeof token === 'string')   {

    const hasExpired = await  TokenHasExpired(token)

    if(hasExpired) {
      redirect('/')
    }
    
  }
  
  return (
    <div className="flex justify-center items-center h-full">
     <ForgotPassword />
    </div>
  );
}
