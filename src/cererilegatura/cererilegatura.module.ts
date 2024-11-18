import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CereriLegaturaController } from './cererilegatura.controller';
import { CereriLegaturaService } from './cererilegatura.service';

@Module({
  imports: [PrismaModule],
  controllers: [CereriLegaturaController],
  providers: [CereriLegaturaService],
})
export class CererilegaturaModule {}
