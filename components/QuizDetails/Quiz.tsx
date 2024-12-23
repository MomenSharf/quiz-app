import { QuizDetailsWithIsBookmark } from "@/types";
import QuizCard from "./QuizCard";
export default function Quiz({
  quiz,
  pathname,
}: {
  quiz: QuizDetailsWithIsBookmark;
  pathname: string;
}) {
  quiz.questions
  return (
    <div className="flex flex-col p-3 items-center w-full ">
      <QuizCard quiz={quiz} pathname={pathname} />
    </div>
  );
}
