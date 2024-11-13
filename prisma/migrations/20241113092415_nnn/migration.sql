/*
  Warnings:

  - You are about to drop the column `password` on the `Profesori` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Studenti` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Studenti` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profesori_email_key";

-- DropIndex
DROP INDEX "Studenti_email_key";

-- AlterTable
ALTER TABLE "Profesori" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Studenti" DROP COLUMN "email",
DROP COLUMN "password";
