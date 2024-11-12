import { Module } from '@nestjs/common';
import { DepartamenteService } from './departamente.service';
import { DepartamenteController } from './departamente.controller';
import {PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [DepartamenteController],
  providers: [DepartamenteService]
})
export class DepartamenteModule {}
