import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CereriLegaturaService } from './cererilegatura.service';
import { CereriLegatura } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('CereriLegatura')
@Controller('cereri-legatura')
export class CereriLegaturaController {
  constructor(private readonly cereriLegaturaService: CereriLegaturaService) {}

  // Get all cereri-legatura records
  @Get()
  @ApiOperation({ summary: 'Get all CereriLegatura records' })
  async getAllCereriLegatura() {
    return this.cereriLegaturaService.getAllCereriLegatura();
  }

  // Get a specific cereri-legatura by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a CereriLegatura record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the CereriLegatura' })
  async getCereriLegaturaById(@Param('id') id_legatura: string) {
    return this.cereriLegaturaService.getCereriLegaturaById(id_legatura);
  }

  // Create a new cereri-legatura record
  @Post()
  @ApiOperation({ summary: 'Create a new CereriLegatura record' })
  @ApiBody({
    description: 'Data for creating a new CereriLegatura',
    schema: {
      type: 'object',
      properties: {
        id_legatura: { type: 'string', example: 'legatura-001' },
        id_cerere: { type: 'string', example: 'cerere-001' },
        id_student: { type: 'string', example: 'stud-001' },
        id_profesor: { type: 'string', example: 'prof-001' },
      },
    },
  })
  async createCereriLegatura(@Body() data: CereriLegatura) {
    return this.cereriLegaturaService.createCereriLegatura(data);
  }

  // Update an existing cereri-legatura record by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a CereriLegatura record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the CereriLegatura' })
  @ApiBody({
    description: 'Partial data for updating a CereriLegatura',
    schema: {
      type: 'object',
      properties: {
        id_cerere: { type: 'string', example: 'cerere-002' },
        id_student: { type: 'string', example: 'stud-002' },
        id_profesor: { type: 'string', example: 'prof-002' },
      },
    },
  })
  async updateCereriLegatura(@Param('id') id_legatura: string, @Body() data: Partial<CereriLegatura>) {
    return this.cereriLegaturaService.updateCereriLegatura(id_legatura, data);
  }

  // Delete a cereri-legatura record by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a CereriLegatura record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the CereriLegatura' })
  async deleteCereriLegatura(@Param('id') id_legatura: string) {
    return this.cereriLegaturaService.deleteCereriLegatura(id_legatura);
  }
}
