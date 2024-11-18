import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ExameneSaliController } from './examenesali.controller';
import { ExameneSaliService } from './examenesali.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExameneSaliController],
  providers: [ExameneSaliService],
})
export class ExamenesaliModule {}
