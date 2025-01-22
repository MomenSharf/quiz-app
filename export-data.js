import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Fetch all data from all models
    const users = await prisma.user.findMany();

    const folders = await prisma.folder.findMany();

    const quizzes = await prisma.quiz.findMany();

    const questions = await prisma.question.findMany();
    const items = await prisma.item.findMany();

    const ratings = await prisma.rating.findMany();

    const bookmarks = await prisma.bookmark.findMany();

    const quizProgress = await prisma.quizProgress.findMany();

    const accounts = await prisma.account.findMany();
    const sessions = await prisma.session.findMany();
    const authenticators = await prisma.authenticator.findMany();
    const verificationTokens = await prisma.verificationToken.findMany();

    // Combine all data into a single object
    const allData = {
      users,
      folders,
      quizzes,
      questions,
      items,
      ratings,
      bookmarks,
      quizProgress,
      accounts,
      sessions,
      authenticators,
      verificationTokens,
    };

    // Save data to a JSON file
    fs.writeFileSync("all-data.json", JSON.stringify(allData, null, 2));
    console.log("All data exported successfully!");
  } catch (error) {
    console.error("Error exporting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
