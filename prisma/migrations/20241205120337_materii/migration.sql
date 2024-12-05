-- CreateTable
CREATE TABLE "Materii" (
    "id_materie" TEXT NOT NULL,
    "nume_materie" TEXT NOT NULL,

    CONSTRAINT "Materii_pkey" PRIMARY KEY ("id_materie")
);

-- CreateTable
CREATE TABLE "_ProfessorToMaterii" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProfessorToMaterii_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AssistantToMaterii" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AssistantToMaterii_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Materii_nume_materie_key" ON "Materii"("nume_materie");

-- CreateIndex
CREATE INDEX "_ProfessorToMaterii_B_index" ON "_ProfessorToMaterii"("B");

-- CreateIndex
CREATE INDEX "_AssistantToMaterii_B_index" ON "_AssistantToMaterii"("B");

-- AddForeignKey
ALTER TABLE "_ProfessorToMaterii" ADD CONSTRAINT "_ProfessorToMaterii_A_fkey" FOREIGN KEY ("A") REFERENCES "Materii"("id_materie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorToMaterii" ADD CONSTRAINT "_ProfessorToMaterii_B_fkey" FOREIGN KEY ("B") REFERENCES "Profesori"("id_profesor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssistantToMaterii" ADD CONSTRAINT "_AssistantToMaterii_A_fkey" FOREIGN KEY ("A") REFERENCES "Materii"("id_materie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssistantToMaterii" ADD CONSTRAINT "_AssistantToMaterii_B_fkey" FOREIGN KEY ("B") REFERENCES "Profesori"("id_profesor") ON DELETE CASCADE ON UPDATE CASCADE;
