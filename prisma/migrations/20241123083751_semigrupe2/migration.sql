/*
  Warnings:

  - You are about to drop the column `id_departament` on the `Grupe` table. All the data in the column will be lost.
  - Added the required column `facultyId` to the `Grupe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grupe" DROP CONSTRAINT "Grupe_id_departament_fkey";

-- AlterTable
ALTER TABLE "Grupe" DROP COLUMN "id_departament",
ADD COLUMN     "facultyId" TEXT NOT NULL;
