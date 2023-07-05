import { TEST_USER_ID } from "~/src/lib/constant";
import { appTestCaller } from "~/src/server/api/root";
import { prisma } from "~/src/server/db";
import { clearTestData } from "~/src/utils/test";

afterAll(async () => {
  await clearTestData();
});

describe("Create", () => {
  it("should create a link", async () => {
    const result = await appTestCaller.link.create({
      link: "https://github.com",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");

    expect(result.url).toContain("github.com");
  });
});

describe("Update", async () => {
  const dataTest = await appTestCaller.link.create({
    link: "https://github.com",
  });

  if (!dataTest) {
    throw new Error("Data test not found");
  }

  it("should update url", async () => {
    const result = await appTestCaller.link.update({
      id: dataTest.id,
      link: "http://gitlab.com/",
      title: dataTest.title,
      description: dataTest.description,
      categoryId: [],
    });

    expect(result.url).toContain("gitlab.com");
  });

  it("should update title", async () => {
    const result = await appTestCaller.link.update({
      id: dataTest.id,
      link: dataTest.url,
      title: "Gitlab Title Test",
      description: dataTest.description,
      categoryId: [],
    });

    expect(result.title).toBe("Gitlab Title Test");
  });

  it("should update description", async () => {
    const result = await appTestCaller.link.update({
      id: dataTest.id,
      link: dataTest.url,
      title: dataTest.title,
      description: "Gitlab Desc Test",
      categoryId: [],
    });

    expect(result.description).toBe("Gitlab Desc Test");
  });

  // TODO: test update category
});
