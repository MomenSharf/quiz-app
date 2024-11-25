/*
  Warnings:

  - You are about to drop the column `type` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VerificationToken_email_token_type_key";

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "type";

-- DropEnum
DROP TYPE "VerificationType";

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");
