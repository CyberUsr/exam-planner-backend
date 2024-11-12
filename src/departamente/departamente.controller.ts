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
  async getDepartamentById(@Param('id') id_departament: string) {
    return this.departamenteService.getDepartamentById(id_departament);
  }

  // Create a new department
  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiBody({
    description: 'Data for creating a new department',
    schema: {
      type: 'object',
      properties: {
        id_departament: { type: 'string', example: 'dep-001' },
        nume_departament: { type: 'string', example: 'Computer Science' },
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
        nume_departament: { type: 'string', example: 'Software Engineering' },
      },
    },
  })
  async updateDepartament(@Param('id') id_departament: string, @Body() data: Partial<Departamente>) {
    return this.departamenteService.updateDepartament(id_departament, data);
  }

  // Delete a department by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the department' })
  async deleteDepartament(@Param('id') id_departament: string) {
    return this.departamenteService.deleteDepartament(id_departament);
  }
}
