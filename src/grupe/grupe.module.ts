import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GrupeController } from './grupe.controller';
import { GrupeService } from './grupe.service';

@Module({
  imports: [PrismaModule],
  controllers: [GrupeController],
  providers: [GrupeService],
})
export class GrupeModule {}
