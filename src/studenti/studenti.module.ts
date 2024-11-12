import { Module } from '@nestjs/common';
import { StudentiService } from './studenti.service';
import { StudentiController } from './studenti.controller';
import {PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [StudentiController],
  providers: [StudentiService]
})
export class StudentiModule {}
