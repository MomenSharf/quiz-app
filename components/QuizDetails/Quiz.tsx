import { QuizDetailsWithIsBookmark } from "@/types";
import QuizCard from "./QuizCard";
export default function Quiz({
  quiz,
  pathname,
  isCurrentUser
}: {
  quiz: QuizDetailsWithIsBookmark;
  pathname: string;
  isCurrentUser?: boolean
}) {
  return (
    <div className="flex flex-col p-3 items-center w-full ">
      <QuizCard quiz={quiz} pathname={pathname} isCurrentUser={isCurrentUser} />
    </div>
  );
}
