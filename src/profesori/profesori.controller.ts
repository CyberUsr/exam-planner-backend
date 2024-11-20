/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProfesoriService } from './profesori.service';
import { Profesori } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Profesori')
@Controller('profesori')
export class ProfesoriController {
  constructor(private readonly profesoriService: ProfesoriService) {}

  @Post('populate')
  async populateProfesori() {
    return this.profesoriService.populateProfesori();
  }

  @Get()
  @ApiOperation({ summary: 'Get all professors' })
  async getAllProfesori() {
    return this.profesoriService.getAllProfesori();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a professor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the professor' })
  async getProfesorById(@Param('id') id_profesor: string) {
    return this.profesoriService.getProfesorById(id_profesor);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new professor' })
  @ApiBody({
    description: 'Data for creating a new professor',
    schema: {
      type: 'object',
      properties: {
        id_profesor: { type: 'string', example: 'prof-001' },
        nume: { type: 'string', example: 'John' },
        prenume: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        specializare: { type: 'string', example: 'Mathematics' },
        id_departament: { type: 'string', example: 'dep-001' },
      },
    },
  })
  async createProfesor(@Body() data: Profesori) {
    return this.profesoriService.createProfesor(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a professor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the professor' })
  @ApiBody({
    description: 'Partial data for updating a professor',
    schema: {
      type: 'object',
      properties: {
        nume: { type: 'string', example: 'Jane' },
        prenume: { type: 'string', example: 'Smith' },
        email: { type: 'string', example: 'jane.smith@example.com' },
        specializare: { type: 'string', example: 'Physics' },
      },
    },
  })
  async updateProfesor(
    @Param('id') id_profesor: string,
    @Body() data: Partial<Profesori>,
  ) {
    return this.profesoriService.updateProfesor(id_profesor, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a professor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the professor' })
  async deleteProfesor(@Param('id') id_profesor: string) {
    return this.profesoriService.deleteProfesor(id_profesor);
  }
}
