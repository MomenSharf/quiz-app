/*
  Warnings:

  - Added the required column `points` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeLimit` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "points" INTEGER NOT NULL,
ADD COLUMN     "timeLimit" INTEGER NOT NULL;
