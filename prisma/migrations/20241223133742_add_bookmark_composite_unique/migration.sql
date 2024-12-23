-- DropIndex
DROP INDEX "Quiz_title_createdAt_description_idx";

-- CreateIndex
CREATE INDEX "Quiz_title_createdAt_idx" ON "Quiz"("title", "createdAt");
