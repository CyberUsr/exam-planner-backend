/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GrupeService } from './grupe.service';
import { Grupe } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Grupe')
@Controller('grupe')
export class GrupeController {
  constructor(private readonly grupeService: GrupeService) {}

  // Get all Grupe records
  @Get()
  @ApiOperation({ summary: 'Get all Grupe records' })
  async getAllGrupe() {
    return this.grupeService.getAllGrupe();
  }

  // Get a specific Grupe by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a Grupe record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Grupe' })
  async getGrupeById(@Param('id') id: string) {
    return this.grupeService.getGrupeById(id);
  }

  // Create a new Grupe record
  @Post()
  @ApiOperation({ summary: 'Create a new Grupe record' })
  @ApiBody({
    description: 'Data for creating a new Grupe record',
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string', example: 'Regular' },
        facultyId: { type: 'string', example: 'FAC001' },
        specializationShortName: { type: 'string', example: 'CS' },
        studyYear: { type: 'string', example: '2023' },
        groupName: { type: 'string', example: 'Group A' },
        subgroupIndex: { type: 'string', example: '1' },
        isModular: { type: 'string', example: 'false' },
        orarId: { type: 'string', example: 'ORAR001' },
      },
    },
  })
  async createGrupe(@Body() data: Omit<Grupe, 'id'>) {
    return this.grupeService.createGrupe(data);
  }

  // Update an existing Grupe record by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a Grupe record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Grupe' })
  @ApiBody({
    description: 'Partial data for updating a Grupe record',
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string', example: 'Updated Type' },
        facultyId: { type: 'string', example: 'FAC002' },
        specializationShortName: { type: 'string', example: 'IS' },
        studyYear: { type: 'string', example: '2024' },
        groupName: { type: 'string', example: 'Group B' },
        subgroupIndex: { type: 'string', example: '2' },
        isModular: { type: 'string', example: 'true' },
        orarId: { type: 'string', example: 'ORAR002' },
      },
    },
  })
  async updateGrupe(@Param('id') id: string, @Body() data: Partial<Grupe>) {
    return this.grupeService.updateGrupe(id, data);
  }

  // Delete a Grupe record by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Grupe record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Grupe' })
  async deleteGrupe(@Param('id') id: string) {
    return this.grupeService.deleteGrupe(id);
  }

  // Populate the Grupe table with data from the external API

  @Post('populate')
  async populateGrupe() {
    return this.grupeService.populateGrupe();
  }
  @Post('populate/:facultyId')
  @ApiOperation({ summary: 'Populate Grupe records by faculty ID' })
  @ApiParam({
    name: 'facultyId',
    type: String,
    description: 'The ID of the faculty to filter groups',
  })
  async populateGrupeByFaculty(@Param('facultyId') facultyId: string) {
    return this.grupeService.populateGrupeByFaculty(facultyId);
  }
}
