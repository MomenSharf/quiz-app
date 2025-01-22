import fs from "fs";

import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

async function main() {
  // Load the data from the generated JSON file
  const fakeData = JSON.parse(
    fs.readFileSync("prisma/quiz_app_fake_data.json", "utf-8")
  );

  // Seed the Users
  for (const user of fakeData.users) {
    await prisma.user.create({
      data: user,
    });
  }

  const quizzes = data.quizzes.map((quiz) => {
    const { questions, ...rest } = quiz;
    return rest;
  });

  // Seed the Quizzes
  for (const quiz of quizzes) {
    await prisma.quiz.create({
      data: quiz,
    });
  }

  const questions = data.quizzes.map((quiz) => {
    const { items,emailVerified , ...rest } = quiz;

    console.log(typeof new Data(emailVerified));
    return {
      rest,
      emailVerified: new Date(emailVerified),
    };
  });
  

  // Seed the Questions
  for (const question of questions) {
    await prisma.question.create({
      data: {
        question,
      },
    });

    const items = data.questions.map((question) => question.items);

    // Seed the Items for each question
    for (const item of items) {
      await prisma.item.create({
        data: item,
      });
    }
  }

  // Seed the Ratings
  for (const rating of fakeData.ratings) {
    await prisma.rating.create({
      data: rating,
    });
  }

  // Seed the Bookmarks
  for (const bookmark of fakeData.bookmarks) {
    await prisma.bookmark.create({
      data: bookmark,
    });
  }

  console.log("Data seeded successfully!");
}

// Run the seed function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
