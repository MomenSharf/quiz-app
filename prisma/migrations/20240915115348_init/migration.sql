/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "difficulty";

-- DropEnum
DROP TYPE "Difficulty";
