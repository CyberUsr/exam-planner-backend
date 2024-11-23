/*
  Warnings:

  - You are about to drop the column `id_departament` on the `Grupe` table. All the data in the column will be lost.
  - You are about to drop the column `id_departament` on the `Sali` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sali` table. All the data in the column will be lost.
  - Added the required column `facultyId` to the `Grupe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nume` to the `Sali` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grupe" DROP CONSTRAINT "Grupe_id_departament_fkey";

-- DropForeignKey
ALTER TABLE "Sali" DROP CONSTRAINT "Sali_id_departament_fkey";

-- AlterTable
ALTER TABLE "Grupe" DROP COLUMN "id_departament",
ADD COLUMN     "facultyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sali" DROP COLUMN "id_departament",
DROP COLUMN "name",
ADD COLUMN     "nume" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isProfesor" BOOLEAN NOT NULL DEFAULT false;
