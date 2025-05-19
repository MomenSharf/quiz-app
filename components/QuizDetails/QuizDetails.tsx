import { Category, QuizDetailsWithIsBookmark } from "@/types";
import QuizCard from "./QuizCard";
import Questions from "./Questions";
import { Switch } from "../ui/switch";
import ShowAnswer from "./ShowAnswer";
import Quizzes from "../Home/Quizzes";
export default function QuizDetails({
  quiz,
  pathname,
  isCurrentUser,
  showAnswers,
}: {
  quiz: QuizDetailsWithIsBookmark;
  pathname: string;
  isCurrentUser?: boolean;
  showAnswers: boolean;
}) {
  console.log(quiz);

  return (
    <div className="container flex flex-col gap-5 p-3 items-center w-full">
      <QuizCard quiz={quiz} pathname={pathname} isCurrentUser={isCurrentUser} />
      {quiz.questions.length > 0 && (
        <div className="w-full flex justify-between">
          <h4 className="text-gray-medium text-sm font-semibold">
            {quiz.questions.length} Question
          </h4>
          <ShowAnswer showAnswers={showAnswers} />
        </div>
      )}
      <Questions questions={quiz.questions} showAnswers={showAnswers} />
      {quiz.categories[0] && (
        <div className="overflow-hidden max-w-full">
          <Quizzes
            args={[
              {
                route: "",
                title: "Simmelre Quizzes",
                args: {
                  category: quiz.categories[0] as Category,
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
