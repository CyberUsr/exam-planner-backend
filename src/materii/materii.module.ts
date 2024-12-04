import { Module } from '@nestjs/common';
import { MateriiService } from './materii.service';
import { MateriiController } from './materii.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MateriiController],
  providers: [MateriiService],
  exports: [MateriiService]
})
export class MateriiModule {}
