/*
  Warnings:

  - You are about to drop the column `imageId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_imageId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "imageId",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "imageId",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "imageId",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageId",
ADD COLUMN     "imageUrl" TEXT;

-- DropTable
DROP TABLE "Image";
