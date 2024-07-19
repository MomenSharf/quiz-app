import QuizForm from "@/components/forms/QuizForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/sign-in");
  }

  // const id = 'fadsfa'

  return <div className="container mb-5">
    <h1 className="text-2xl mt-3 font-semibold">Create Quiz</h1>
    <QuizForm type="CREATE" userId={session.user.id}/>
  </div>;
}

export default page;
