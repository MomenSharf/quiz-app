/*
  Warnings:

  - You are about to drop the column `correctAnswers` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `correctOrder` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `imagesOptions` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `pairs` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswers",
DROP COLUMN "correctOrder",
DROP COLUMN "imageUrl",
DROP COLUMN "imagesOptions",
DROP COLUMN "options",
DROP COLUMN "pairs",
ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "imageUrl",
ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "match" TEXT,
    "isCorrect" BOOLEAN,
    "order" INTEGER,
    "questionId" TEXT,
    "imageId" TEXT,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "uploadthingId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
