-- AlterTable
ALTER TABLE "Cereri" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';

-- CreateTable
CREATE TABLE "_StudentToMaterii" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentToMaterii_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentToMaterii_B_index" ON "_StudentToMaterii"("B");

-- AddForeignKey
ALTER TABLE "_StudentToMaterii" ADD CONSTRAINT "_StudentToMaterii_A_fkey" FOREIGN KEY ("A") REFERENCES "Materii"("id_materie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToMaterii" ADD CONSTRAINT "_StudentToMaterii_B_fkey" FOREIGN KEY ("B") REFERENCES "Studenti"("id_student") ON DELETE CASCADE ON UPDATE CASCADE;
