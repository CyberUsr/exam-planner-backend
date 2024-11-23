-- CreateTable
CREATE TABLE "Grupe" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id_departament" TEXT NOT NULL,
    "specializationShortName" TEXT NOT NULL,
    "studyYear" TEXT NOT NULL,
    "groupName" TEXT,
    "subgroupIndex" TEXT NOT NULL,
    "isModular" TEXT NOT NULL,
    "orarId" TEXT NOT NULL,

    CONSTRAINT "Grupe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grupe" ADD CONSTRAINT "Grupe_id_departament_fkey" FOREIGN KEY ("id_departament") REFERENCES "Departamente"("id_departament") ON DELETE RESTRICT ON UPDATE CASCADE;
