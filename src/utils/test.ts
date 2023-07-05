import { TEST_USER_ID } from "~/src/lib/constant";
import { prisma } from "~/src/server/db";

export const clearTestData = async () => {
  await prisma.link.deleteMany({
    where: {
      userId: TEST_USER_ID,
    },
  });
};
