/*
  Warnings:

  - You are about to drop the column `nume_sala` on the `Sali` table. All the data in the column will be lost.
  - You are about to drop the column `stare` on the `Sali` table. All the data in the column will be lost.
  - Added the required column `buildingName` to the `Sali` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Sali` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortName` to the `Sali` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sali" DROP COLUMN "nume_sala",
DROP COLUMN "stare",
ADD COLUMN     "buildingName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "shortName" TEXT NOT NULL;
