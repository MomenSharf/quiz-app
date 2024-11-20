import Provider from "@/components/PlayQuiz/Provider";
import { getQuiz } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import {quizSchema} from '@/lib/validations/quizSchemas'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export default async function page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const quiz = await getQuiz(quizId);

  if (!quiz) {
    return notFound();
  }

    // Validate the quiz with Zod
    // const validationResult = quizSchema.safeParse(quiz);

    // if (!validationResult.success) {
    //   const isAuthor = session.user.id === quiz.user.id; // Assuming quiz has `authorId`
  
    //   return (
    //     <div className="min-h-screen flex items-center justify-center">
    //       <div className="bg-white shadow-md rounded-lg p-6 text-center">
    //         <h1 className="text-2xl font-semibold mb-4">
    //           {isAuthor ? "Quiz Validation Failed" : "Quiz Not Available"}
    //         </h1>
    //         <p className="text-gray-600 mb-6">
    //           {isAuthor
    //             ? "The quiz data is invalid. Would you like to edit the quiz?"
    //             : "The quiz is currently unavailable. Please contact the author or try again later."}
    //         </p>
    //         {isAuthor && (
    //           <Link
    //             href={`/quizzes/${quizId}`}
    //             className={cn(buttonVariants())}
    //           >
    //             Go to Edit Quiz
    //           </Link>
    //         ) }
    //       </div>
    //     </div>
    //   );
    // }

  return (
    <div className="min-h-screen  root-background-white">
      <Provider quiz={quiz} />
    </div>
  );
}
