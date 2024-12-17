/*
  Warnings:

  - You are about to drop the column `questionId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropIndex
DROP INDEX "Image_questionId_key";

-- DropIndex
DROP INDEX "Image_quizId_key";

-- DropIndex
DROP INDEX "Image_userId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "questionId",
DROP COLUMN "quizId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
