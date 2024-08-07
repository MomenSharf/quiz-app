import { Folder, Question, Quiz, User } from "@prisma/client";

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
  | "imageUrl"
  | "difficulty"
  | "visibility"
  | "createdAt"
  | "updatedAt"
  | "categories"
> & {
  questions: Question[];
  user: Pick<User, "email" | "name" | "image">;
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
