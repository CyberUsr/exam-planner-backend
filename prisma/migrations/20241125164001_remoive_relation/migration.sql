/*
  Warnings:

  - You are about to drop the `_ExameneToGrupe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExameneToGrupe" DROP CONSTRAINT "_ExameneToGrupe_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExameneToGrupe" DROP CONSTRAINT "_ExameneToGrupe_B_fkey";

-- DropTable
DROP TABLE "_ExameneToGrupe";
