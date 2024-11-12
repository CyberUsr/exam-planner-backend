import { Module } from '@nestjs/common';
import { ProfesoriService } from './profesori.service';
import { ProfesoriController } from './profesori.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule here
  controllers: [ProfesoriController],
  providers: [ProfesoriService],
})
export class ProfesoriModule {}
