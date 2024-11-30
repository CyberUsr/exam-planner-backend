import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { DepartamenteService } from './departamente.service';
import { Departamente } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Departamente')
@Controller('departamente')
export class DepartamenteController {
  constructor(private readonly departamenteService: DepartamenteService) {}

  // Get all departments
  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  async getAllDepartamente() {
    return this.departamenteService.getAllDepartamente();
  }

  // Get a department by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a department by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the department' })
  async getDepartamentById(@Param('id') idDepartament: string) {
    return this.departamenteService.getDepartamentById(idDepartament);
  }

  // Create a new department
  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiBody({
    description: 'Data for creating a new department',
    schema: {
      type: 'object',
      properties: {
        idDepartament: { type: 'string', example: 'dep-001' },
        shortName: { type: 'string', example: 'CS' },
        longName: { type: 'string', example: 'Computer Science' },
      },
    },
  })
  async createDepartament(@Body() data: Departamente) {
    return this.departamenteService.createDepartament(data);
  }

  // Update a department by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a department by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the department' })
  @ApiBody({
    description: 'Partial data for updating a department',
    schema: {
      type: 'object',
      properties: {
        shortName: { type: 'string', example: 'SE' },
        longName: { type: 'string', example: 'Software Engineering' },
      },
    },
  })
  async updateDepartament(@Param('id') idDepartament: string, @Body() data: Partial<Departamente>) {
    return this.departamenteService.updateDepartament(idDepartament, data);
  }

  // Delete a department by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the department' })
  async deleteDepartament(@Param('id') idDepartament: string) {
    return this.departamenteService.deleteDepartament(idDepartament);
  }

    // Populate the departments table
@Post('populate')
@ApiOperation({ summary: 'Populate the Departamente table from external data' })
async populateDepartamente() {
  return this.departamenteService.populateDepartamente();
}

}
