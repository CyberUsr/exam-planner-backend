/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { MateriiService } from './materii.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Materii } from '@prisma/client';

@ApiTags('materii')
@Controller('materii')
export class MateriiController {
  constructor(private readonly materiiService: MateriiService) {}
  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, description: 'Returns all subjects.' })
  async getAllMaterii(): Promise<Materii[]> {
    return this.materiiService.getAllMaterii();
  }

  // Endpoint to fetch subjects for a specific teacher by ID
  @Get('teacher/:id')
  @ApiOperation({ summary: 'Get subjects for a specific teacher by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the teacher' })
  @ApiResponse({
    status: 200,
    description: 'Returns subjects for the teacher.',
  })
  @ApiResponse({
    status: 404,
    description: 'No subjects found for the teacher.',
  })
  async getMateriiForTeacher(
    @Param('id') teacherId: string,
  ): Promise<Materii[]> {
    return this.materiiService.getMateriiForTeacher(teacherId);
  }
  @Get('import')
  @ApiOperation({
    summary: 'Import Materii for all professors from the endpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'Materii imported successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to import Materii.',
  })
  async importMaterii(): Promise<string> {
    try {
      await this.materiiService.importMateriiFromEndpoint();
      return 'Materii imported successfully';
    } catch (error) {
      throw new HttpException(
        `Failed to import Materii: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
