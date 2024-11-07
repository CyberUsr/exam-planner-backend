/*
  Warnings:

  - You are about to drop the column `id_materie` on the `Cereri` table. All the data in the column will be lost.
  - You are about to drop the column `id_profesor` on the `Cereri` table. All the data in the column will be lost.
  - You are about to drop the column `id_sala` on the `Cereri` table. All the data in the column will be lost.
  - You are about to drop the column `id_student` on the `Cereri` table. All the data in the column will be lost.
  - You are about to drop the column `id_materie` on the `Profesori` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `Studenti` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dati` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Materii` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Cereri` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_examene_sali` to the `Cereri` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Cereri` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ora` to the `Cereri` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profesori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_departament` to the `Profesori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specializare` to the `Profesori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_departament` to the `Sali` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stare` to the `Sali` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specializare` to the `Studenti` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cereri" DROP CONSTRAINT "Cereri_id_materie_fkey";

-- DropForeignKey
ALTER TABLE "Cereri" DROP CONSTRAINT "Cereri_id_profesor_fkey";

-- DropForeignKey
ALTER TABLE "Cereri" DROP CONSTRAINT "Cereri_id_sala_fkey";

-- DropForeignKey
ALTER TABLE "Cereri" DROP CONSTRAINT "Cereri_id_student_fkey";

-- DropForeignKey
ALTER TABLE "Materii" DROP CONSTRAINT "Materii_id_date_fkey";

-- DropForeignKey
ALTER TABLE "Materii" DROP CONSTRAINT "Materii_id_sala_fkey";

-- DropForeignKey
ALTER TABLE "Profesori" DROP CONSTRAINT "Profesori_id_materie_fkey";

-- AlterTable
ALTER TABLE "Cereri" DROP COLUMN "id_materie",
DROP COLUMN "id_profesor",
DROP COLUMN "id_sala",
DROP COLUMN "id_student",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_examene_sali" TEXT NOT NULL,
ADD COLUMN     "id_user" TEXT NOT NULL,
ADD COLUMN     "ora" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Profesori" DROP COLUMN "id_materie",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id_departament" TEXT NOT NULL,
ADD COLUMN     "specializare" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sali" ADD COLUMN     "id_departament" TEXT NOT NULL,
ADD COLUMN     "stare" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Studenti" DROP COLUMN "program",
ADD COLUMN     "specializare" TEXT NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Dati";

-- DropTable
DROP TABLE "Materii";

-- CreateTable
CREATE TABLE "Examene" (
    "id_examene" TEXT NOT NULL,
    "nume_materie" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "ora" TIMESTAMP(3) NOT NULL,
    "tip_evaluare" TEXT NOT NULL,
    "actualizatDe" TEXT NOT NULL,
    "actualizatLa" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Examene_pkey" PRIMARY KEY ("id_examene")
);

-- CreateTable
CREATE TABLE "Departamente" (
    "id_departament" TEXT NOT NULL,
    "nume_departament" TEXT NOT NULL,

    CONSTRAINT "Departamente_pkey" PRIMARY KEY ("id_departament")
);

-- CreateTable
CREATE TABLE "ExameneSali" (
    "id_examene_sali" TEXT NOT NULL,
    "id_examene" TEXT NOT NULL,
    "id_sala" TEXT NOT NULL,

    CONSTRAINT "ExameneSali_pkey" PRIMARY KEY ("id_examene_sali")
);

-- CreateTable
CREATE TABLE "CereriLegatura" (
    "id_legatura" TEXT NOT NULL,
    "id_cerere" TEXT NOT NULL,
    "id_student" TEXT NOT NULL,
    "id_profesor" TEXT NOT NULL,

    CONSTRAINT "CereriLegatura_pkey" PRIMARY KEY ("id_legatura")
);

-- AddForeignKey
ALTER TABLE "Profesori" ADD CONSTRAINT "Profesori_id_departament_fkey" FOREIGN KEY ("id_departament") REFERENCES "Departamente"("id_departament") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sali" ADD CONSTRAINT "Sali_id_departament_fkey" FOREIGN KEY ("id_departament") REFERENCES "Departamente"("id_departament") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cereri" ADD CONSTRAINT "Cereri_id_examene_sali_fkey" FOREIGN KEY ("id_examene_sali") REFERENCES "ExameneSali"("id_examene_sali") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameneSali" ADD CONSTRAINT "ExameneSali_id_examene_fkey" FOREIGN KEY ("id_examene") REFERENCES "Examene"("id_examene") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameneSali" ADD CONSTRAINT "ExameneSali_id_sala_fkey" FOREIGN KEY ("id_sala") REFERENCES "Sali"("id_sala") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CereriLegatura" ADD CONSTRAINT "CereriLegatura_id_cerere_fkey" FOREIGN KEY ("id_cerere") REFERENCES "Cereri"("id_cerere") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CereriLegatura" ADD CONSTRAINT "CereriLegatura_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Studenti"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CereriLegatura" ADD CONSTRAINT "CereriLegatura_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesori"("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE;
