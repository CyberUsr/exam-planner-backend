/*
  Warnings:

  - You are about to drop the column `nume_materie` on the `Examene` table. All the data in the column will be lost.
  - Added the required column `id_materie` to the `Examene` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AssistantToExamene" DROP CONSTRAINT "_AssistantToExamene_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessorToExamene" DROP CONSTRAINT "_ProfessorToExamene_A_fkey";

-- AlterTable
ALTER TABLE "Examene" DROP COLUMN "nume_materie",
ADD COLUMN     "id_materie" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Materii" (
    "id_materie" TEXT NOT NULL,
    "nume_materie" TEXT NOT NULL,
    "id_grupa" TEXT,
    "groupName" TEXT,
    "studyYear" TEXT,
    "specializationShortName" TEXT,

    CONSTRAINT "Materii_pkey" PRIMARY KEY ("id_materie")
);

-- CreateIndex
CREATE UNIQUE INDEX "Materii_nume_materie_key" ON "Materii"("nume_materie");

-- CreateIndex
CREATE INDEX "Materii_id_grupa_idx" ON "Materii"("id_grupa");

-- CreateIndex
CREATE INDEX "Examene_id_materie_idx" ON "Examene"("id_materie");

-- AddForeignKey
ALTER TABLE "Materii" ADD CONSTRAINT "Materii_id_grupa_fkey" FOREIGN KEY ("id_grupa") REFERENCES "Grupe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_id_materie_fkey" FOREIGN KEY ("id_materie") REFERENCES "Materii"("id_materie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorToExamene" ADD CONSTRAINT "_ProfessorToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Materii"("id_materie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssistantToExamene" ADD CONSTRAINT "_AssistantToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Materii"("id_materie") ON DELETE CASCADE ON UPDATE CASCADE;
