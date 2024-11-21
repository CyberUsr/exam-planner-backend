/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { SaliService } from './sali.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Sali } from '@prisma/client';

@ApiTags('Sali')
@Controller('sali')
export class SaliController {
  constructor(private readonly saliService: SaliService) {}

  @Post('populate')
  async populateSali() {
    return this.saliService.populateSali();
  }

  @Get()
  async getSali(@Query('buildingName') buildingName: string) {
    if (buildingName) {
      return this.saliService.getSaliByBuilding(buildingName);
    }
    return this.saliService.getAllSali();
  }
  // Get all rooms
  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  async getAllSali(): Promise<Sali[]> {
    return this.saliService.getAllSali();
  }

  // Get a room by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the room (UUID format)',
    example: 'c51c5f44-3b97-11ec-9bbc-0242ac130002',
  })
  async getSalaById(@Param('id') id_sala: string): Promise<Sali> {
    return this.saliService.getSalaById(id_sala);
  }

  // Create a new room
  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiBody({
    description: 'Data for creating a new room',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Room A1' },
        shortName: { type: 'string', example: 'A1' },
        buildingName: { type: 'string', example: 'Building 1' },
        id_departament: { type: 'string', example: 'dep-001' },
      },
    },
  })
  async createSala(@Body() data: Omit<Sali, 'id_sala'>): Promise<Sali> {
    return this.saliService.createSala(data);
  }

  // Update a room by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a room by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the room (UUID format)',
    example: 'c51c5f44-3b97-11ec-9bbc-0242ac130002',
  })
  @ApiBody({
    description: 'Partial data for updating a room',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Room B2' },
        shortName: { type: 'string', example: 'B2' },
        buildingName: { type: 'string', example: 'Building 2' },
        id_departament: { type: 'string', example: 'dep-002' },
      },
    },
  })
  async updateSala(
    @Param('id') id_sala: string,
    @Body() data: Partial<Omit<Sali, 'id_sala'>>,
  ): Promise<Sali> {
    return this.saliService.updateSala(id_sala, data);
  }

  // Delete a room by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the room (UUID format)',
    example: 'c51c5f44-3b97-11ec-9bbc-0242ac130002',
  })
  async deleteSala(@Param('id') id_sala: string): Promise<Sali> {
    return this.saliService.deleteSala(id_sala);
  }
}
