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
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('materii')
@Controller('materii')
export class MateriiController {
  constructor(private readonly materiiService: MateriiService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subject' })
  @ApiBody({
    schema: {
      example: {
        nume_materie: 'Programare Web',
        specializationShortName: 'INFO',
        studyYear: '2',
        groupName: 'A',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The subject has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createMaterie(
    @Body() createMaterieDto: Prisma.MateriiCreateInput,
  ): Promise<Materii> {
    return this.materiiService.createMaterie(createMaterieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, description: 'Return all subjects.' })
  async getAllMaterii(): Promise<Materii[]> {
    return this.materiiService.getAllMaterii();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subject by ID' })
  @ApiResponse({ status: 200, description: 'Return the subject.' })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async getMaterieById(@Param('id') id: string): Promise<Materii> {
    return this.materiiService.getMaterieById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subject' })
  @ApiResponse({
    status: 200,
    description: 'The subject has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async updateMaterie(
    @Param('id') id: string,
    @Body() updateMaterieDto: Prisma.MateriiUpdateInput,
  ): Promise<Materii> {
    return this.materiiService.updateMaterie(id, updateMaterieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subject' })
  @ApiResponse({
    status: 200,
    description: 'The subject has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async deleteMaterie(@Param('id') id: string): Promise<Materii> {
    return this.materiiService.deleteMaterie(id);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filter subjects' })
  @ApiQuery({ name: 'specializationShortName', required: false })
  @ApiQuery({ name: 'studyYear', required: false })
  @ApiQuery({ name: 'groupName', required: false })
  @ApiQuery({ name: 'facultyName', required: false })
  @ApiResponse({ status: 200, description: 'Returns filtered subjects.' })
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

  @Put(':id/professors')
  @ApiOperation({ summary: 'Add professors to a subject' })
  @ApiBody({
    schema: {
      example: ['professor-id-1', 'professor-id-2'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Professors have been added to the subject.',
  })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async addProfessorsToMaterie(
    @Param('id') id: string,
    @Body() professorIds: string[],
  ): Promise<Materii> {
    return this.materiiService.addProfessorsToMaterie(id, professorIds);
  }

  @Put(':id/assistants')
  @ApiOperation({ summary: 'Add assistants to a subject' })
  @ApiBody({
    schema: {
      example: ['assistant-id-1', 'assistant-id-2'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Assistants have been added to the subject.',
  })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  async addAssistantsToMaterie(
    @Param('id') id: string,
    @Body() assistantIds: string[],
  ): Promise<Materii> {
    return this.materiiService.addAssistantsToMaterie(id, assistantIds);
  }

  @Get('export/specialization')
  @ApiOperation({ summary: 'Export subjects grouped by specialization' })
  @ApiResponse({
    status: 200,
    description: 'Returns subjects grouped by specialization.',
  })
  async exportMateriiGroupedBySpecialization() {
    return this.materiiService.exportMateriiGroupedBySpecialization();
  }
}
