import { Module } from '@nestjs/common';
import { MateriiService } from './materii.service';
import { MateriiController } from './materii.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust the import path as needed

@Module({
  imports: [PrismaModule],
  controllers: [MateriiController],
  providers: [MateriiService],
  exports: [MateriiService] // Optional: export if you need to use this service in other modules
})
export class MateriiModule {}