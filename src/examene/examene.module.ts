import { Module } from '@nestjs/common';
import { ExameneService } from './examene.service';
import { ExameneController } from './examene.controller';
import {PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ExameneController],
  providers: [ExameneService]
})
export class ExameneModule {}
