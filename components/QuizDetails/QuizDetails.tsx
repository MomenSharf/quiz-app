import { QuizDetailsWithIsBookmark } from "@/types";
import QuizCard from "./QuizCard";
import Questions from "./Questions";
import { Switch } from "../ui/switch";
import ShowAnswer from "./ShowAnswer";
export default function QuizDetails({
  quiz,
  pathname,
  isCurrentUser,
}: {
  quiz: QuizDetailsWithIsBookmark;
  pathname: string;
  isCurrentUser?: boolean;
}) {
  return (
    <div className="container flex flex-col gap-5 p-3 items-center w-full ">
      <QuizCard quiz={quiz} pathname={pathname} isCurrentUser={isCurrentUser} />
      <div className="w-full flex justify-between">
        <h4 className="text-gray-medium text-sm font-semibold">
          {quiz.questions.length} Question
        </h4>
      <ShowAnswer />
      </div>
      <Questions questions={quiz.questions} />
    </div>
  );
}
