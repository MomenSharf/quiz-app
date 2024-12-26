import { BookmarkQuiz, SearchQuiz, UserProfile } from "@/types";
import QuizPanel from "./QuizPanel";

export default function QuizzesPanelsTable({
  quizzes,
}: {
  quizzes: SearchQuiz[] | BookmarkQuiz[] | UserProfile['quizzes'];
}) {
  return (
    <div className="flex flex-col gap-1">
      {quizzes.map((quiz, i) => {
        return <QuizPanel quiz={quiz} index={i} key={quiz.id} />;
      })}
    </div>
  );
}
