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
import { CereriService } from './cereri.service';
import { Cereri } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Cereri')
@Controller('cereri')
export class CereriController {
  constructor(private readonly cereriService: CereriService) {}

  // Get all cereri
  @Get()
  @ApiOperation({ summary: 'Get all cereri' })
  async getAllCereri() {
    return this.cereriService.getAllCereri();
  }

  // Get a cerere by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a cerere by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the cerere' })
  async getCerereById(@Param('id') id_cerere: string) {
    return this.cereriService.getCerereById(id_cerere);
  }

  // Create a new cerere
  @Post()
  @ApiOperation({ summary: 'Create a new cerere' })
  @ApiBody({
    description: 'Data for creating a new cerere',
    schema: {
      type: 'object',
      properties: {
        id_cerere: { type: 'string', example: 'cerere-001' },
        id_user: { type: 'string', example: 'user-001' },
        id_examene_sali: { type: 'string', example: 'examene-sala-001' },
        data: { type: 'string', example: '2024-06-15T10:00:00Z' },
        ora: { type: 'string', example: '2024-06-15T10:00:00Z' },
      },
    },
  })
  async createCerere(@Body() data: Cereri) {
    return this.cereriService.createCerere(data);
  }

  // Update a cerere by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a cerere by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the cerere' })
  @ApiBody({
    description: 'Partial data for updating a cerere',
    schema: {
      type: 'object',
      properties: {
        id_user: { type: 'string', example: 'user-002' },
        id_examene_sali: { type: 'string', example: 'examene-sala-002' },
        data: { type: 'string', example: '2024-06-16T11:00:00Z' },
        ora: { type: 'string', example: '2024-06-16T11:00:00Z' },
      },
    },
  })
  async updateCerere(
    @Param('id') id_cerere: string,
    @Body() data: Partial<Cereri>,
  ) {
    return this.cereriService.updateCerere(id_cerere, data);
  }

  // Delete a cerere by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cerere by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the cerere' })
  async deleteCerere(@Param('id') id_cerere: string) {
    return this.cereriService.deleteCerere(id_cerere);
  }
}
