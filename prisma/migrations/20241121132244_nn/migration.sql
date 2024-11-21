/*
  Warnings:

  - You are about to drop the column `name` on the `Sali` table. All the data in the column will be lost.
  - Added the required column `nume` to the `Sali` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sali" DROP COLUMN "name",
ADD COLUMN     "nume" TEXT NOT NULL;
