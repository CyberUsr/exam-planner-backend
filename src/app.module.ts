import { Module } from '@nestjs/common';
import { ProfesoriModule } from './profesori/profesori.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentiModule } from './studenti/studenti.module';
import { SaliModule } from './sali/sali.module';
import { ExameneModule } from './examene/examene.module';
import { DepartamenteModule } from './departamente/departamente.module';
import { CereriModule } from './cereri/cereri.module';
import { ExamenesaliModule } from './examenesali/examenesali.module';
import { CererilegaturaModule } from './cererilegatura/cererilegatura.module';

@Module({
  imports: [PrismaModule, ProfesoriModule, StudentiModule, SaliModule, ExameneModule, DepartamenteModule, CereriModule, ExamenesaliModule, CererilegaturaModule],
})
export class AppModule {}
