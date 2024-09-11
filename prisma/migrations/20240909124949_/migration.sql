/*
  Warnings:

  - The values [SINGLE_CHOICE,MULTIPLE_CHOICE] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ResetToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('UNSELECTED', 'PICK_ANSWER', 'TRUE_FALSE', 'FILL_IN_THE_BLANK', 'SHORT_ANSWER', 'MATCHING_PAIRS', 'ORDER', 'PICK_IMAGE', 'CODE');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ResetToken" DROP CONSTRAINT "ResetToken_userId_fkey";

-- DropTable
DROP TABLE "ResetToken";
