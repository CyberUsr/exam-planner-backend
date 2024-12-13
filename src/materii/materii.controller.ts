/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { MateriiService } from './materii.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('materii')
@Controller('materii')
export class MateriiController {
  constructor(private readonly materiiService: MateriiService) {}

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
