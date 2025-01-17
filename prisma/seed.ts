import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Your seeding logic goes here
  console.log('Seeding data...');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
