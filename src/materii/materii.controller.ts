import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MateriiService } from './materii.service';
import { Prisma, Materii } from '@prisma/client';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('materii')
@Controller('materii')
export class MateriiController {
  constructor(private readonly materiiService: MateriiService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subject' })
  @ApiResponse({ status: 201, description: 'The subject has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createMaterie(@Body() createMaterieDto: Prisma.MateriiCreateInput): Promise<Materii> {
    return this.materiiService.createMaterie(createMaterieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, description: 'Return all subjects.' })
  @ApiResponse({ status: 404, description: 'No subjects found.' })
  async getAllMaterii(): Promise<Materii[]> {
    return this.materiiService.getAllMaterii();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subject by ID' })
  @ApiResponse({ status: 200, description: 'Return a specific subject.' })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async getMaterieById(@Param('id') id: string): Promise<Materii> {
    return this.materiiService.getMaterieById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subject by ID' })
  @ApiResponse({ status: 200, description: 'The subject has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async updateMaterie(
    @Param('id') id: string,
    @Body() updateMaterieDto: Prisma.MateriiUpdateInput
  ): Promise<Materii> {
    return this.materiiService.updateMaterie(id, updateMaterieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subject by ID' })
  @ApiResponse({ status: 200, description: 'The subject has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async deleteMaterie(@Param('id') id: string): Promise<Materii> {
    return this.materiiService.deleteMaterie(id);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filter subjects based on criteria' })
  @ApiResponse({ status: 200, description: 'Return subjects based on filtering criteria.' })
  async filterMaterii(@Query() filters: { specializationShortName?: string; studyYear?: string; groupName?: string; facultyName?: string; }): Promise<Materii[]> {
    return this.materiiService.filterMaterii(filters);
  }

  @Post('force')
  @ApiOperation({ summary: 'Force add a subject with minimal validation' })
  @ApiResponse({ status: 201, description: 'The subject has been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async forceAddMaterie(@Body() data: Partial<Materii>): Promise<Materii> {
    return this.materiiService.forceAddMaterie(data);
  }

  @Get('export/specialization')
  @ApiOperation({ summary: 'Export subjects grouped by specialization' })
  @ApiResponse({ status: 200, description: 'Return subjects grouped by specialization.' })
  async exportMateriiGroupedBySpecialization() {
    return this.materiiService.exportMateriiGroupedBySpecialization();
  }

  @Put(':id/professors')
  @ApiOperation({ summary: 'Add professors to a subject' })
  @ApiResponse({ status: 200, description: 'Professors have been successfully added to the subject.' })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async addProfessorsToMaterie(@Param('id') id: string, @Body() professorIds: string[]): Promise<Materii> {
    return this.materiiService.addProfessorsToMaterie(id, professorIds);
  }

  @Put(':id/assistants')
  @ApiOperation({ summary: 'Add assistants to a subject' })
  @ApiResponse({ status: 200, description: 'Assistants have been successfully added to the subject.' })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async addAssistantsToMaterie(@Param('id') id: string, @Body() assistantIds: string[]): Promise<Materii> {
    return this.materiiService.addAssistantsToMaterie(id, assistantIds);
  }
}
