/*
  Warnings:

  - You are about to drop the column `isProfesor` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Profesor', 'Secretariat', 'Admin');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isProfesor",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Student';
