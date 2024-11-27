-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizProgress" DROP CONSTRAINT "QuizProgress_quizId_fkey";

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizProgress" ADD CONSTRAINT "QuizProgress_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
