/*
  Warnings:

  - The primary key for the `Examene` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actualizatDe` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `actualizatLa` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `id_examene` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `id_grupa` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `nume_materie` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `ora` on the `Examene` table. All the data in the column will be lost.
  - Added the required column `anul` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departament` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grupa` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - The required column `id_examen` was added to the `Examene` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_materie` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeMateriei` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profesor_id` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specializarea` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tip_evaluare` on the `Examene` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipEvaluare" AS ENUM ('Partial', 'Colocviu', 'Final');

-- DropForeignKey
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_id_grupa_fkey";

-- DropForeignKey
ALTER TABLE "ExameneSali" DROP CONSTRAINT "ExameneSali_id_examene_fkey";

-- DropForeignKey
ALTER TABLE "_AssistantToExamene" DROP CONSTRAINT "_AssistantToExamene_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessorToExamene" DROP CONSTRAINT "_ProfessorToExamene_A_fkey";

-- DropIndex
DROP INDEX "Examene_id_grupa_idx";

-- AlterTable
ALTER TABLE "Cereri" ADD COLUMN     "sala" TEXT;

-- AlterTable
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_pkey",
DROP COLUMN "actualizatDe",
DROP COLUMN "actualizatLa",
DROP COLUMN "data",
DROP COLUMN "id_examene",
DROP COLUMN "id_grupa",
DROP COLUMN "nume_materie",
DROP COLUMN "ora",
ADD COLUMN     "anul" TEXT NOT NULL,
ADD COLUMN     "asistent_id" TEXT,
ADD COLUMN     "departament" TEXT NOT NULL,
ADD COLUMN     "grupa" TEXT NOT NULL,
ADD COLUMN     "grupeId" TEXT,
ADD COLUMN     "id_examen" TEXT NOT NULL,
ADD COLUMN     "id_materie" TEXT NOT NULL,
ADD COLUMN     "numeMateriei" TEXT NOT NULL,
ADD COLUMN     "profesor_id" TEXT NOT NULL,
ADD COLUMN     "specializarea" TEXT NOT NULL,
DROP COLUMN "tip_evaluare",
ADD COLUMN     "tip_evaluare" "TipEvaluare" NOT NULL,
ADD CONSTRAINT "Examene_pkey" PRIMARY KEY ("id_examen");

-- CreateTable
CREATE TABLE "Materii" (
    "id_materie" TEXT NOT NULL,
    "nume_materie" TEXT NOT NULL,

    CONSTRAINT "Materii_pkey" PRIMARY KEY ("id_materie")
);

-- CreateIndex
CREATE UNIQUE INDEX "Materii_nume_materie_key" ON "Materii"("nume_materie");

-- CreateIndex
CREATE INDEX "Examene_id_materie_idx" ON "Examene"("id_materie");

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_id_materie_fkey" FOREIGN KEY ("id_materie") REFERENCES "Materii"("id_materie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_departament_fkey" FOREIGN KEY ("departament") REFERENCES "Departamente"("idDepartament") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_profesor_id_fkey" FOREIGN KEY ("profesor_id") REFERENCES "Profesori"("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_asistent_id_fkey" FOREIGN KEY ("asistent_id") REFERENCES "Profesori"("id_profesor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_grupeId_fkey" FOREIGN KEY ("grupeId") REFERENCES "Grupe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameneSali" ADD CONSTRAINT "ExameneSali_id_examene_fkey" FOREIGN KEY ("id_examene") REFERENCES "Examene"("id_examen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorToExamene" ADD CONSTRAINT "_ProfessorToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Materii"("id_materie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssistantToExamene" ADD CONSTRAINT "_AssistantToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Materii"("id_materie") ON DELETE CASCADE ON UPDATE CASCADE;
