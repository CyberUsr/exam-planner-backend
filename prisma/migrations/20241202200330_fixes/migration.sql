-- AlterTable
ALTER TABLE "Examene" ADD COLUMN     "id_grupa" TEXT;

-- CreateIndex
CREATE INDEX "Examene_id_grupa_idx" ON "Examene"("id_grupa");

-- AddForeignKey
ALTER TABLE "Examene" ADD CONSTRAINT "Examene_id_grupa_fkey" FOREIGN KEY ("id_grupa") REFERENCES "Grupe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
