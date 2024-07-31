"use client";
import { cn, formatTimeAgo } from "@/lib/utils";
import { Question, QuestionType, Quiz } from "@prisma/client";
import {
  EllipsisVertical,
  Layers,
  ListChecks,
  LockKeyhole,
  Trash2,
  WholeWord,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import DeleteQuizButton from "./DeleteQuizButton";
import QuizGalleryItemMenu from "./QuizGalleryItemMenu";
import QuizGalleryItemDrawer from "./QuizGalleryItemDrawer";
import { QuizWithQuestions } from "@/types";
import VisibilityButton from "./VisibilityButton";

type QuizzesTableProps = {
  quizzes: QuizWithQuestions[];
};

export default function QuizzesGallery({ quizzes }: QuizzesTableProps) {
  const [quizzesChecked, setQuizzesChecked] = useState<string[]>([]);

  const quizzesIds = useMemo(() => quizzes.map((quiz) => quiz.id), [quizzes]);

  useEffect(() => {
    if (!quizzesChecked.every((id) => quizzesIds.includes(id))) {
      setQuizzesChecked([]);
    }
  }, [quizzesChecked, quizzesIds]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center font-semibold">
          <Button
            size="icon"
            variant={
              quizzesChecked.length >= quizzes.length ? "default" : "outline"
            }
          >
            <ListChecks
              className="w-4 h-4 mr-1"
              onClick={() => {
                if (quizzesChecked.length >= quizzes.length) {
                  setQuizzesChecked([]);
                } else {
                  setQuizzesChecked(quizzesIds);
                }
              }}
            />
          </Button>
          {quizzesChecked.length !== 0 && (
            <>
              <DeleteQuizButton
                variant="destructive"
                text="Delete"
                className="flex gap-1"
                quizzesIds={quizzesChecked}
                pathname="/my-quizzes"
              />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {quizzesChecked.length} Selected Quizzes{" "}
                <Button
                  className="w-auto cursor-pointer"
                  size="icon"
                  variant="ghost"
                >
                  <X
                    className="w-4 h-4 font-semibold"
                    onClick={() => setQuizzesChecked([])}
                  />
                </Button>
              </span>
            </>
          )}
        </div>

        {quizzes.map((quiz) => {
          return (
            <div
              key={quiz.id}
              className={cn(
                "max-w-full flex gap-1 sm:gap-3 items-center bg-card rounded-md  hover:shadow-md transition-all duration-200",
                {
                  "border border-primary": quizzesChecked.includes(quiz.id),
                }
              )}
            >
              <div className="flex justify-center items-center pl-1.5 sm:pl-3">
                <label htmlFor={quiz.id} className="">
                  <Checkbox
                    id={quiz.id}
                    checked={quizzesChecked.includes(quiz.id)}
                    onCheckedChange={(checkedState) => {
                      if (checkedState)
                        setQuizzesChecked((prev) => [...prev, quiz.id]);
                      else
                        setQuizzesChecked((prev) =>
                          prev.filter((e) => e !== quiz.id)
                        );
                    }}
                  />
                </label>
              </div>
              <Link
                href={`/my-quizzes/${quiz.id}`}
                className="py-3 flex-1 max-w-full flex gap-1"
              >
                <div className="flex items-center gap-2">
                  <div className="object-contain rounded-md overflow-hidden min-w-[60px]">
                    <Image
                      src={
                        quiz.imageUrl ? quiz.imageUrl : "/assets/images/gg.svg"
                      }
                      alt={"image"}
                      width={100}
                      height={60}
                    />
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
                        <VisibilityButton quiz={quiz} pathname="/my-quizzes"  className="w-6 h-6" withText/>
                      </div>
                      <div className="flex gap-1 text-xs items-center">
                        <span className="p-1.5 rounded-full bg-[var(--main-bg)]">
                          <Layers className="w-3 h-3" />
                        </span>
                        {quiz.questions.length}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="hidden sm:flex text-muted-foreground text-sm">{formatTimeAgo(quiz.createdAt)}</div>
              <div className="flex justify-center items-center mr-2">
                <div className="hidden sm:block">
                  <QuizGalleryItemMenu
                    contentPostionClasses="right-4"
                    trigger={
                      <Button className="p-0 w-auto" variant="ghost">
                        <EllipsisVertical className="h-4" />
                      </Button>
                    }
                    quiz={quiz}
                  />
                </div>
                <div className="block sm:hidden">
                  <QuizGalleryItemDrawer
                    trigger={
                      <Button className="p-0 w-auto" variant="ghost">
                        <EllipsisVertical className="h-4" />
                      </Button>
                    }
                    quiz={quiz}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
