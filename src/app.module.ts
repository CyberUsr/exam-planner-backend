import { Module } from '@nestjs/common';
import { ProfesoriModule } from './profesori/profesori.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentiModule } from './studenti/studenti.module';
import { SaliModule } from './sali/sali.module';

@Module({
  imports: [PrismaModule, ProfesoriModule, StudentiModule, SaliModule],
})
export class AppModule {}
