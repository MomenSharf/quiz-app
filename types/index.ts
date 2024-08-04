import { Folder, Quiz } from "@prisma/client";

export type QuizGalleryWithQuestionsCount = Pick<Quiz, 'id' | "title" | 'difficulty' | "visibility" | 'imageUrl' | 'createdAt' | 'updatedAt'> & {
  _count: {
    questions: number
  };
};

export type FolderGalleryWithQuizzesCount = Pick<Folder, 'id' | "title"| 'createdAt'| 'updatedAt' >  & {
  _count: {
    quizzes: number
  }
}

export type FolderPathSegment = {
  id: string;
  title: string;
}