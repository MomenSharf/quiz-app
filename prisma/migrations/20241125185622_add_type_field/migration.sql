/*
  Warnings:

  - A unique constraint covering the columns `[email,token,type]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('RESET_PASSWORD', 'VERIFY_ACCOUNT');

-- DropIndex
DROP INDEX "VerificationToken_email_token_key";

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "type" "VerificationType" NOT NULL DEFAULT 'VERIFY_ACCOUNT';

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_type_key" ON "VerificationToken"("email", "token", "type");
