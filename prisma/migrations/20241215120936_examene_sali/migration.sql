-- DropForeignKey
ALTER TABLE "Cereri" DROP CONSTRAINT "Cereri_id_examene_sali_fkey";

-- CreateTable
CREATE TABLE "_CereriToExameneSali" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CereriToExameneSali_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CereriToExameneSali_B_index" ON "_CereriToExameneSali"("B");

-- AddForeignKey
ALTER TABLE "_CereriToExameneSali" ADD CONSTRAINT "_CereriToExameneSali_A_fkey" FOREIGN KEY ("A") REFERENCES "Cereri"("id_cerere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CereriToExameneSali" ADD CONSTRAINT "_CereriToExameneSali_B_fkey" FOREIGN KEY ("B") REFERENCES "ExameneSali"("id_examene_sali") ON DELETE CASCADE ON UPDATE CASCADE;
