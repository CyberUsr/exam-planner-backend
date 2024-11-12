import { Module } from '@nestjs/common';
import { SaliService } from './sali.service';
import { SaliController } from './sali.controller';
import {PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [SaliController],
  providers: [SaliService]
})
export class StudentiModule {}
