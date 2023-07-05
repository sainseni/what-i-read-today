import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Seeding database user...");

  const data = await prisma.user.create({
    data: {
      email: "test@gmail.com",
      name: "test",
    },
  });

  console.log(data);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
