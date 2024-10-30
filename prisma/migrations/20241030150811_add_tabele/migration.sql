/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "Dati" (
    "id_date" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "ora" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dati_pkey" PRIMARY KEY ("id_date")
);

-- CreateTable
CREATE TABLE "Profesori" (
    "id_profesor" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "prenume" TEXT NOT NULL,
    "id_materie" TEXT,

    CONSTRAINT "Profesori_pkey" PRIMARY KEY ("id_profesor")
);

-- CreateTable
CREATE TABLE "Studenti" (
    "id_student" TEXT NOT NULL,
    "grupa" TEXT NOT NULL,
    "anul" INTEGER NOT NULL,
    "nume" TEXT NOT NULL,
    "prenume" TEXT NOT NULL,
    "program" TEXT NOT NULL,

    CONSTRAINT "Studenti_pkey" PRIMARY KEY ("id_student")
);

-- CreateTable
CREATE TABLE "Sali" (
    "id_sala" TEXT NOT NULL,
    "nume_sala" TEXT NOT NULL,

    CONSTRAINT "Sali_pkey" PRIMARY KEY ("id_sala")
);

-- CreateTable
CREATE TABLE "Cereri" (
    "id_cerere" TEXT NOT NULL,
    "id_profesor" TEXT NOT NULL,
    "id_student" TEXT NOT NULL,
    "id_materie" TEXT NOT NULL,
    "id_sala" TEXT NOT NULL,

    CONSTRAINT "Cereri_pkey" PRIMARY KEY ("id_cerere")
);

-- CreateTable
CREATE TABLE "Materii" (
    "id_materie" TEXT NOT NULL,
    "nume_materie" TEXT NOT NULL,
    "id_date" TEXT NOT NULL,
    "id_sala" TEXT NOT NULL,

    CONSTRAINT "Materii_pkey" PRIMARY KEY ("id_materie")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- AddForeignKey
ALTER TABLE "Profesori" ADD CONSTRAINT "Profesori_id_materie_fkey" FOREIGN KEY ("id_materie") REFERENCES "Materii"("id_materie") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cereri" ADD CONSTRAINT "Cereri_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesori"("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cereri" ADD CONSTRAINT "Cereri_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Studenti"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cereri" ADD CONSTRAINT "Cereri_id_materie_fkey" FOREIGN KEY ("id_materie") REFERENCES "Materii"("id_materie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cereri" ADD CONSTRAINT "Cereri_id_sala_fkey" FOREIGN KEY ("id_sala") REFERENCES "Sali"("id_sala") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materii" ADD CONSTRAINT "Materii_id_date_fkey" FOREIGN KEY ("id_date") REFERENCES "Dati"("id_date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materii" ADD CONSTRAINT "Materii_id_sala_fkey" FOREIGN KEY ("id_sala") REFERENCES "Sali"("id_sala") ON DELETE RESTRICT ON UPDATE CASCADE;
