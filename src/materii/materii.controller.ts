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
import { Prisma, Materii, Examene } from '@prisma/client';
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

  @Post(':materieName/add-professors')
  @ApiOperation({ 
    summary: 'Add professors to a subject',
    description: 'Adds professors to a specific subject by subject name'
  })
  @ApiBody({
    schema: {
      example: {
        professorNames: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Smith' }
        ]
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Professors have been added to the subject.',
  })
  @ApiResponse({ status: 404, description: 'Subject or Professor not found.' })
  async addProfessorsToMaterie(
    @Param('materieName') materieName: string,
    @Body() body: { 
      professorNames: { firstName: string; lastName: string }[]
    }
  ): Promise<Materii> {
    return this.materiiService.addProfessorsToMaterie(
      materieName, 
      body.professorNames
    );
  }

  @Post(':materieName/add-assistants')
@ApiOperation({ 
  summary: 'Add assistants to a subject',
  description: 'Adds assistants to a specific subject by subject name'
})
@ApiBody({
  schema: {
    example: {
      assistantNames: [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' }
      ]
    }
  }
})
@ApiResponse({
  status: 200,
  description: 'Assistants have been added to the subject.',
})
@ApiResponse({ status: 404, description: 'Subject or Assistant not found.' })
async addAssistantsToMaterie(
  @Param('materieName') materieName: string,
  @Body() body: { 
    assistantNames: { firstName: string; lastName: string }[]
  }
): Promise<Materii> {
  return this.materiiService.addAssistantsToMaterie(
    materieName, 
    body.assistantNames
  );
}
}