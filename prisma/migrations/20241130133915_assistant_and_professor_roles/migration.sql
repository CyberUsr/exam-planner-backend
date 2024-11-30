-- CreateTable
CREATE TABLE "_ProfessorToExamene" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssistantToExamene" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorToExamene_AB_unique" ON "_ProfessorToExamene"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorToExamene_B_index" ON "_ProfessorToExamene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssistantToExamene_AB_unique" ON "_AssistantToExamene"("A", "B");

-- CreateIndex
CREATE INDEX "_AssistantToExamene_B_index" ON "_AssistantToExamene"("B");

-- AddForeignKey
ALTER TABLE "_ProfessorToExamene" ADD CONSTRAINT "_ProfessorToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Examene"("id_examene") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorToExamene" ADD CONSTRAINT "_ProfessorToExamene_B_fkey" FOREIGN KEY ("B") REFERENCES "Profesori"("id_profesor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssistantToExamene" ADD CONSTRAINT "_AssistantToExamene_A_fkey" FOREIGN KEY ("A") REFERENCES "Examene"("id_examene") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssistantToExamene" ADD CONSTRAINT "_AssistantToExamene_B_fkey" FOREIGN KEY ("B") REFERENCES "Profesori"("id_profesor") ON DELETE CASCADE ON UPDATE CASCADE;
