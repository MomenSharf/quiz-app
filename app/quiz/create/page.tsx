import QuizForm from "@/components/forms/QuizForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/sign-in");
  }

  // const id = 'fadsfa'

  return <div className="container">
    <QuizForm type="CREATE" userId={session.user.id}/>
  </div>;
}

export default page;
