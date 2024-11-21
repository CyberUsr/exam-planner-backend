import { Module } from '@nestjs/common';
import { SaliService } from './sali.service';
import { SaliController } from './sali.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importing PrismaModule to provide PrismaService
  controllers: [SaliController], // Registering SaliController
  providers: [SaliService], // Registering SaliService
})
export class SaliModule {}
