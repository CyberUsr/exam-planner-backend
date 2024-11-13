/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Profesori` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Studenti` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Profesori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Studenti` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Studenti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profesori" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Studenti" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profesori_email_key" ON "Profesori"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Studenti_email_key" ON "Studenti"("email");
