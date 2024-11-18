import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ExameneSaliService } from './examenesali.service';
import { ExameneSali } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('ExameneSali')
@Controller('examenesali')
export class ExameneSaliController {
  constructor(private readonly exameneSaliService: ExameneSaliService) {}

  // Get all examene-sali records
  @Get()
  @ApiOperation({ summary: 'Get all ExameneSali records' })
  async getAllExameneSali() {
    return this.exameneSaliService.getAllExameneSali();
  }

  // Get a specific examene-sali by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an ExameneSali record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the ExameneSali' })
  async getExameneSaliById(@Param('id') id_examene_sali: string) {
    return this.exameneSaliService.getExameneSaliById(id_examene_sali);
  }

  // Create a new examene-sali record
  @Post()
  @ApiOperation({ summary: 'Create a new ExameneSali record' })
  @ApiBody({
    description: 'Data for creating a new ExameneSali',
    schema: {
      type: 'object',
      properties: {
        id_examene_sali: { type: 'string', example: 'examsala-001' },
        id_examene: { type: 'string', example: 'exam-001' },
        id_sala: { type: 'string', example: 'sala-101' },
      },
    },
  })
  async createExameneSali(@Body() data: ExameneSali) {
    return this.exameneSaliService.createExameneSali(data);
  }

  // Update an existing examene-sali record by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update an ExameneSali record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the ExameneSali' })
  @ApiBody({
    description: 'Partial data for updating an ExameneSali',
    schema: {
      type: 'object',
      properties: {
        id_examene: { type: 'string', example: 'exam-002' },
        id_sala: { type: 'string', example: 'sala-102' },
      },
    },
  })
  async updateExameneSali(@Param('id') id_examene_sali: string, @Body() data: Partial<ExameneSali>) {
    return this.exameneSaliService.updateExameneSali(id_examene_sali, data);
  }

  // Delete an examene-sali record by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ExameneSali record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the ExameneSali' })
  async deleteExameneSali(@Param('id') id_examene_sali: string) {
    return this.exameneSaliService.deleteExameneSali(id_examene_sali);
  }
}
