import { Module } from '@nestjs/common';
import { ProfesoriModule } from './profesori/profesori.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentiModule } from './studenti/studenti.module';
import { SaliModule } from './sali/sali.module';
import { ExameneModule } from './examene/examene.module';
import { DepartamenteModule } from './departamente/departamente.module';
import { CereriModule } from './cereri/cereri.module';

@Module({
  imports: [PrismaModule, ProfesoriModule, StudentiModule, SaliModule, ExameneModule, DepartamenteModule, CereriModule],
})
export class AppModule {}
