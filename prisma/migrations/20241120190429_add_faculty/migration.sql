/*
  Warnings:

  - Added the required column `facultate` to the `Profesori` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profesori" ADD COLUMN     "facultate" TEXT NOT NULL;
