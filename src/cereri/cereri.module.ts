import { Module } from '@nestjs/common';
import { CereriService } from './cereri.service';
import { CereriController } from './cereri.controller';
import {PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CereriController],
  providers: [CereriService]
})
export class CereriModule {}
