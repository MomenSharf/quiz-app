import CreateQuizTabs from "@/components/CreateQuiz/CreateQuizTabs";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="container flex justify-center">
      <CreateQuizTabs />
    </div>
  );
}

export default page;
