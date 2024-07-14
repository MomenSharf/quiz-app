import QuizForm from "@/components/forms/QuizForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  // const session = await getCurrentUser();

  // if (!session) {
  //   return redirect("/sign-in");
  // }

  return <div className="container mb-5">
    <h1 className="text-2xl my-5 font-semibold">Create Quiz</h1>
    <QuizForm type="CREATE" />
  </div>;
}

export default page;
