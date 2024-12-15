/*
  Warnings:

  - Added the required column `id_materie` to the `Cereri` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cereri" ADD COLUMN     "id_materie" TEXT NOT NULL;
