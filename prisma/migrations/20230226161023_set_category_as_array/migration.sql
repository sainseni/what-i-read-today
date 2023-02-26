/*
  Warnings:

  - You are about to drop the column `category_id` on the `links` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_category_id_fkey";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "_CategoryToLink" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToLink_AB_unique" ON "_CategoryToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToLink_B_index" ON "_CategoryToLink"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToLink" ADD CONSTRAINT "_CategoryToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToLink" ADD CONSTRAINT "_CategoryToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
