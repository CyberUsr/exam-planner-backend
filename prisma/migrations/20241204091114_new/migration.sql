/*
  Warnings:

  - You are about to drop the column `groupName` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `specializationShortName` on the `Examene` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Examene" DROP COLUMN "groupName",
DROP COLUMN "specializationShortName";

-- AlterTable
ALTER TABLE "Materii" ADD COLUMN     "groupName" TEXT,
ADD COLUMN     "id_grupa" TEXT,
ADD COLUMN     "specializationShortName" TEXT,
ADD COLUMN     "studyYear" TEXT;

-- CreateIndex
CREATE INDEX "Examene_id_materie_idx" ON "Examene"("id_materie");

-- CreateIndex
CREATE INDEX "Materii_id_grupa_idx" ON "Materii"("id_grupa");

-- AddForeignKey
ALTER TABLE "Materii" ADD CONSTRAINT "Materii_id_grupa_fkey" FOREIGN KEY ("id_grupa") REFERENCES "Grupe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
