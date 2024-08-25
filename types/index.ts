import { QUESTION_TYPES } from "@/constants";
import { Folder, Question, Quiz, User } from "@prisma/client";

export type QuestionType = (typeof QUESTION_TYPES)[number]
export type updataQuiz = Pick<
  Quiz,
  | "title"
  | "description"
  | "imageUrl"
  | "difficulty"
  | "visibility"
  | "categories"
>;

export type QuizGalleryWithQuestionsCount = Pick<
  Quiz,
  | "id"
  | "title"
  | "difficulty"
  | "visibility"
  | "imageUrl"
  | "createdAt"
  | "updatedAt"
> & {
  _count: {
    questions: number;
  };
};
export type EditorQuiz = Pick<
  Quiz,
  | "id"
  | "title"
  | "description"
  | "categories"
  | "difficulty"
  | "visibility"
  | "imageUrl"
  | "createdAt"
  | "updatedAt"
> & {
  questions: Question[];
  user: User;
};

export type FolderGalleryWithQuizzesCount = Pick<
  Folder,
  "id" | "title" | "createdAt" | "updatedAt"
> & {
  _count: {
    quizzes: number;
  };
};

export type FolderPathSegment = {
  id: string;
  title: string;
};
