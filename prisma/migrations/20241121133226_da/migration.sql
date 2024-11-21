/*
  Warnings:

  - You are about to drop the column `id_departament` on the `Sali` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sali" DROP CONSTRAINT "Sali_id_departament_fkey";

-- AlterTable
ALTER TABLE "Sali" DROP COLUMN "id_departament";
