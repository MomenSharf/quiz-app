/*
  Warnings:

  - The values [LONG_ANSWER,MATCHING,RANKING,PICTURE_CHOICE,DRAG_AND_DROP,INTERACTIVE] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `questionOrder` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('UNSELECTED', 'SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_THE_BLANK', 'SHORT_ANSWER', 'MATCHING_PAIRS', 'ORDER', 'PICK_IMAGE', 'CODE');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "imagesOptions" JSONB[],
ADD COLUMN     "pairs" JSONB[],
ADD COLUMN     "questionOrder" INTEGER NOT NULL,
ALTER COLUMN "question" DROP NOT NULL,
ALTER COLUMN "correctAnswer" DROP NOT NULL,
ALTER COLUMN "codeSnippet" DROP NOT NULL;

-- DropTable
DROP TABLE "Item";
