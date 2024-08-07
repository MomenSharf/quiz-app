import { cn, formatTimeAgo } from "@/lib/utils";
import { QuizGalleryWithQuestionsCount } from "@/types";
import { Layers } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import QuizGalleryQuizDrawer from "./QuizGalleryQuizDrawer";
import QuizGalleryQuizMenu from "./QuizGalleryQuizMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import VisibilityButton from "@/components/VisibilityButton";
import { Button } from "@/components/ui/button";

type QuizGalleryQuizProps = {
  quiz: QuizGalleryWithQuestionsCount;
  quizzesChecked: {
    title: string;
    id: string;
  }[];
  setQuizzesChecked: Dispatch<
    SetStateAction<
      {
        title: string;
        id: string;
      }[]
    >
  >;
};
export default function QuizGalleryQuiz({
  quiz,
  quizzesChecked,
  setQuizzesChecked,
}: QuizGalleryQuizProps) {
  return (
    <div
      className={cn(
        "max-w-full flex gap-1 sm:gap-3 items-center bg-card rounded-md  hover:shadow-md transition-all duration-200",
        {
          "border border-primary": quizzesChecked.includes({
            title: quiz.title,
            id: quiz.id,
          }),
        }
      )}
    >
      <div className="flex justify-center items-center pl-1.5 sm:pl-3">
        <label htmlFor={quiz.id} className="">
          <Checkbox
            id={quiz.id}
            checked={quizzesChecked.map(e => e.id).includes(quiz.id)}
            onCheckedChange={(checkedState) => {
              if (checkedState) {
                setQuizzesChecked((prev) => [
                  ...prev,
                  { title: quiz.title, id: quiz.id },
                ]);
              } else {
                setQuizzesChecked((prev) =>
                  prev.filter((e) => e.id !== quiz.id)
                );
              }
            }}
            className="w-3 h-3 sm:w-4 sm:h-4"
          />
        </label>
      </div>
      <Link
        href={`/quizzes/${quiz.id}`}
        className="py-3 flex-1 max-w-full flex gap-1"
      >
        <div className="flex items-center gap-2">

          <div className="h-full flex justify-center items-center object-contain rounded-md overflow-hidden min-w-16 sm:min-w-20 bg-[hsl(var(--primary)_/_10%)] ">
            <Icons.quizzes className="w-7 h-7 fill-primary" />
          </div> 
          <div className="flex flex-col gap-1">
            <p className="max-w-full truncate font-medium hover:text-primary transition-colors">
              {quiz.title}
            </p>
            <div
              className="flex gap-2"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex gap-1 text-xs items-center">
                <VisibilityButton
                  quiz={quiz}
                  pathname="/my-quizzes"
                  className="w-6 h-6"
                  withText
                />
              </div>
              <div className="flex gap-1 text-xs items-center">
                <span className="p-1.5 rounded-full bg-[var(--main-bg)]">
                  <Layers className="w-3 h-3" />
                </span>
                {quiz._count.questions}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="hidden sm:flex text-muted-foreground text-sm">
        {formatTimeAgo(quiz.updatedAt)}
      </div>
      <div className="flex justify-center items-center mr-2">
        <div className="hidden sm:block">
          <QuizGalleryQuizMenu
            contentPostionClasses="right-4"
            trigger={
              <Button className="px-2 w-auto" variant="ghost">
                <Icons.ellipsis className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
              </Button>
            }
            quiz={quiz}
          />
        </div>
        <div className="block sm:hidden">
          <QuizGalleryQuizDrawer
            trigger={
              <Button className="px-2 w-auto" variant="ghost">
                <Icons.ellipsis className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
              </Button>
            }
            quiz={quiz}
          />
        </div>
      </div>
    </div>
  );
}
