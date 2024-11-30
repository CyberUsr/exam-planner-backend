/*
  Warnings:

  - The primary key for the `Departamente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_departament` on the `Departamente` table. All the data in the column will be lost.
  - You are about to drop the column `nume_departament` on the `Departamente` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Profesori` table. All the data in the column will be lost.
  - You are about to drop the column `id_departament` on the `Profesori` table. All the data in the column will be lost.
  - You are about to drop the column `nume` on the `Profesori` table. All the data in the column will be lost.
  - You are about to drop the column `prenume` on the `Profesori` table. All the data in the column will be lost.
  - You are about to drop the column `specializare` on the `Profesori` table. All the data in the column will be lost.
  - You are about to drop the column `id_departament` on the `Sali` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sali` table. All the data in the column will be lost.
  - The required column `idDepartament` was added to the `Departamente` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `emailAddress` to the `Profesori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDepartament` to the `Profesori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nume` to the `Sali` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Profesor', 'Secretariat', 'Admin');

-- DropForeignKey
ALTER TABLE "Profesori" DROP CONSTRAINT "Profesori_id_departament_fkey";

-- DropForeignKey
ALTER TABLE "Sali" DROP CONSTRAINT "Sali_id_departament_fkey";

-- AlterTable
ALTER TABLE "Departamente" DROP CONSTRAINT "Departamente_pkey",
DROP COLUMN "id_departament",
DROP COLUMN "nume_departament",
ADD COLUMN     "idDepartament" TEXT NOT NULL,
ADD COLUMN     "longName" TEXT,
ADD COLUMN     "shortName" TEXT,
ADD CONSTRAINT "Departamente_pkey" PRIMARY KEY ("idDepartament");

-- AlterTable
ALTER TABLE "Profesori" DROP COLUMN "email",
DROP COLUMN "id_departament",
DROP COLUMN "nume",
DROP COLUMN "prenume",
DROP COLUMN "specializare",
ADD COLUMN     "departmentName" TEXT NOT NULL DEFAULT 'Exterior',
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "facultyName" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "idDepartament" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Sali" DROP COLUMN "id_departament",
DROP COLUMN "name",
ADD COLUMN     "nume" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Student';

-- CreateTable
CREATE TABLE "Grupe" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "specializationShortName" TEXT NOT NULL,
    "studyYear" TEXT NOT NULL,
    "groupName" TEXT,
    "subgroupIndex" TEXT,
    "isModular" TEXT NOT NULL,
    "orarId" TEXT NOT NULL,

    CONSTRAINT "Grupe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profesori" ADD CONSTRAINT "Profesori_idDepartament_fkey" FOREIGN KEY ("idDepartament") REFERENCES "Departamente"("idDepartament") ON DELETE RESTRICT ON UPDATE CASCADE;
