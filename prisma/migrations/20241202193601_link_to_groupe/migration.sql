-- AlterTable
ALTER TABLE "_AssistantToExamene" ADD CONSTRAINT "_AssistantToExamene_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AssistantToExamene_AB_unique";

-- AlterTable
ALTER TABLE "_ProfessorToExamene" ADD CONSTRAINT "_ProfessorToExamene_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProfessorToExamene_AB_unique";
