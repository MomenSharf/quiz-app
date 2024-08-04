"use client";
import {
  FolderGalleryWithQuizzesCount,
  QuizGalleryWithQuestionsCount,
} from "@/types";
import { ListChecks, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import DeleteQuizButton from "./Quizzes/DeleteQuizButton";
import QuizGalleryFolder from "./Folders/QuizGalleryFolder";
import QuizGalleryQuiz from "./Quizzes/QuizGalleryQuiz";


type QuizzesTableProps = {
  quizzes: QuizGalleryWithQuestionsCount[];
  folders: FolderGalleryWithQuizzesCount[];
};

export default function QuizzesGallery({
  quizzes,
  folders,
}: QuizzesTableProps) {
  const [quizzesChecked, setQuizzesChecked] = useState<
    { title: string; id: string }[]
  >([]);

  const titleIds = useMemo(
    () =>
      quizzes.map((quiz) => {
        return { title: quiz.title, id: quiz.id };
      }),
    [quizzes]
  );

  useEffect(() => {
    if (
      !quizzesChecked
        .map((e) => e.id)
        .every((id) => titleIds.map((e) => e.id).includes(id))
    ) {
      setQuizzesChecked([]);
    }
  }, [quizzesChecked, titleIds]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center font-semibold">
          <Button
            size="icon"
            disabled={quizzes.length === 0}
            variant={
              quizzesChecked.length >= quizzes.length && quizzes.length !== 0
                ? "default"
                : "outline"
            }
          >
            <ListChecks
              className="w-4 h-4 mr-1"
              
              onClick={() => {
                if (quizzesChecked.length >= quizzes.length) {
                  setQuizzesChecked([]);
                } else {
                  setQuizzesChecked(titleIds);
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
                titleIds={quizzesChecked}
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

        {folders.map((folder) => {
          return <QuizGalleryFolder key={folder.id} folder={folder} />;
        })}
        {quizzes.map((quiz) => {
          return (
            <QuizGalleryQuiz
              key={quiz.id}
              quiz={quiz}
              quizzesChecked={quizzesChecked}
              setQuizzesChecked={setQuizzesChecked}
            />
          );
        })}
      </div>
    </div>
  );
}
