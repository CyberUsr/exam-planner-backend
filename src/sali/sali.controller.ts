import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SaliService } from './sali.service';
import { Sali } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Sali')
@Controller('sali')
export class SaliController {
  constructor(private readonly saliService: SaliService) {}

  // Get all rooms
  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  async getAllSali() {
    return this.saliService.getAllSali();
  }

  // Get a room by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the room' })
  async getSalaById(@Param('id') id_sala: string) {
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
        id_sala: { type: 'string', example: 'sala-001' },
        nume_sala: { type: 'string', example: 'Room A1' },
        stare: { type: 'string', example: 'Available' },
        id_departament: { type: 'string', example: 'dep-001' },
      },
    },
  })
  async createSala(@Body() data: Sali) {
    return this.saliService.createSala(data);
  }

  // Update a room by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a room by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the room' })
  @ApiBody({
    description: 'Partial data for updating a room',
    schema: {
      type: 'object',
      properties: {
        nume_sala: { type: 'string', example: 'Room B2' },
        stare: { type: 'string', example: 'Occupied' },
        id_departament: { type: 'string', example: 'dep-002' },
      },
    },
  })
  async updateSala(@Param('id') id_sala: string, @Body() data: Partial<Sali>) {
    return this.saliService.updateSala(id_sala, data);
  }

  // Delete a room by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the room' })
  async deleteSala(@Param('id') id_sala: string) {
    return this.saliService.deleteSala(id_sala);
  }
}
