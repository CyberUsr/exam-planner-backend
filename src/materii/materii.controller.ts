/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { MateriiService } from './materii.service';
import { Prisma, Materii } from '@prisma/client';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('materii')
@Controller('materii')
export class MateriiController {
  constructor(private readonly materiiService: MateriiService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subject' })
  @ApiResponse({
    status: 201,
    description: 'The subject has been successfully created.',
  })
  async createMaterie(
    @Body() createMaterieDto: Prisma.MateriiCreateInput,
  ): Promise<Materii> {
    return this.materiiService.createMaterie(createMaterieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  async getAllMaterii(): Promise<Materii[]> {
    return this.materiiService.getAllMaterii();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subject by ID' })
  async getMaterieById(@Param('id') id: string): Promise<Materii> {
    return this.materiiService.getMaterieById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subject by ID' })
  async updateMaterie(
    @Param('id') id: string,
    @Body() updateMaterieDto: Prisma.MateriiUpdateInput,
  ): Promise<Materii> {
    return this.materiiService.updateMaterie(id, updateMaterieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subject by ID' })
  async deleteMaterie(@Param('id') id: string): Promise<Materii> {
    return this.materiiService.deleteMaterie(id);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filter subjects' })
  async filterMaterii(
    @Query()
    filters: {
      specializationShortName?: string;
      studyYear?: string;
      groupName?: string;
      facultyName?: string;
    },
  ): Promise<Materii[]> {
    return this.materiiService.filterMaterii(filters);
  }

  @Post('force')
  @ApiOperation({ summary: 'Force add a subject' })
  async forceAddMaterie(@Body() data: Partial<Materii>): Promise<Materii> {
    return this.materiiService.forceAddMaterie(data);
  }

  @Get('export/specialization')
  @ApiOperation({ summary: 'Export grouped by specialization' })
  async exportMateriiGroupedBySpecialization() {
    return this.materiiService.exportMateriiGroupedBySpecialization();
  }

  @Put(':id/professors')
  @ApiOperation({ summary: 'Add professors to a subject' })
  async addProfessorsToMaterie(
    @Param('id') id: string,
    @Body() professorIds: string[],
  ): Promise<Materii> {
    return this.materiiService.addProfessorsToMaterie(id, professorIds);
  }

  @Put(':id/assistants')
  @ApiOperation({ summary: 'Add assistants to a subject' })
  async addAssistantsToMaterie(
    @Param('id') id: string,
    @Body() assistantIds: string[],
  ): Promise<Materii> {
    return this.materiiService.addAssistantsToMaterie(id, assistantIds);
  }
}
