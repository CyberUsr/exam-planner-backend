-- CreateTable
CREATE TABLE "_ExameneToGrupe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExameneToGrupe_AB_unique" ON "_ExameneToGrupe"("A", "B");

-- CreateIndex
CREATE INDEX "_ExameneToGrupe_B_index" ON "_ExameneToGrupe"("B");

-- AddForeignKey
ALTER TABLE "_ExameneToGrupe" ADD CONSTRAINT "_ExameneToGrupe_A_fkey" FOREIGN KEY ("A") REFERENCES "Examene"("id_examene") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExameneToGrupe" ADD CONSTRAINT "_ExameneToGrupe_B_fkey" FOREIGN KEY ("B") REFERENCES "Grupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
