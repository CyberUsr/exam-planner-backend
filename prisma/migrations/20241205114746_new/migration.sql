/*
  Warnings:

  - You are about to drop the column `sala` on the `Cereri` table. All the data in the column will be lost.
  - The primary key for the `Examene` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `anul` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `asistent_id` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `departament` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `grupa` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `grupeId` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `id_examen` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `id_materie` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `numeMateriei` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `profesor_id` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the column `specializarea` on the `Examene` table. All the data in the column will be lost.
  - You are about to drop the `Materii` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actualizatDe` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actualizatLa` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - The required column `id_examene` was added to the `Examene` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nume_materie` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ora` to the `Examene` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tip_evaluare` on the `Examene` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_asistent_id_fkey";

-- DropForeignKey
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_departament_fkey";

-- DropForeignKey
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_grupeId_fkey";

-- DropForeignKey
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_id_materie_fkey";

-- DropForeignKey
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_profesor_id_fkey";

-- DropForeignKey
ALTER TABLE "ExameneSali" DROP CONSTRAINT "ExameneSali_id_examene_fkey";

-- DropForeignKey
ALTER TABLE "_AssistantToExamene" DROP CONSTRAINT "_AssistantToExamene_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessorToExamene" DROP CONSTRAINT "_ProfessorToExamene_A_fkey";

-- DropIndex
DROP INDEX "Examene_id_materie_idx";

-- AlterTable
ALTER TABLE "Cereri" DROP COLUMN "sala";

-- AlterTable
ALTER TABLE "Examene" DROP CONSTRAINT "Examene_pkey",
DROP COLUMN "anul",
DROP COLUMN "asistent_id",
DROP COLUMN "departament",
DROP COLUMN "grupa",
DROP COLUMN "grupeId",
DROP COLUMN "id_examen",
DROP COLUMN "id_materie",
DROP COLUMN "numeMateriei",
DROP COLUMN "profesor_id",
DROP COLUMN "specializarea",
ADD COLUMN     "actualizatDe" TEXT NOT NULL,
ADD COLUMN     "actualizatLa" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_examene" TEXT NOT NULL,
ADD COLUMN     "id_grupa" TEXT,
ADD COLUMN     "nume_materie" TEXT NOT NULL,
ADD COLUMN     "ora" TIMESTAMP(3) NOT NULL,
DROP COLUMN "tip_evaluare",
ADD COLUMN     "tip_evaluare" TEXT NOT NULL,
ADD CONSTRAINT "Examene_pkey" PRIMARY KEY ("id_examene");

-- DropTable
DROP TABLE "Materii";

-- DropEnum
DROP TYPE "TipEvaluare";

-- CreateIndex
CREATE INDEX "Examene_id_grupa_idx" ON "Examene"("id_grupa");

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_id_grupa_fkey" FOREIGN KEY ("id_grupa") REFERENCES "Grupe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameneSali" ADD CONSTRAINT "ExameneSali_id_examene_fkey" FOREIGN KEY ("id_examene") REFERENCES "Examene"("id_examene") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorToExamene" ADD CONSTRAINT "_ProfessorToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Examene"("id_examene") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssistantToExamene" ADD CONSTRAINT "_AssistantToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Examene"("id_examene") ON DELETE CASCADE ON UPDATE CASCADE;
