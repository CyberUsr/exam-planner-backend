-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "roomBuilding" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "weekDay" INTEGER NOT NULL,
    "startHour" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "parity" TEXT NOT NULL,
    "otherInfo" TEXT,
    "materieId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_materieId_fkey" FOREIGN KEY ("materieId") REFERENCES "Materii"("id_materie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Grupe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Profesori"("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE;
