import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ExameneService } from './examene.service';
import { Examene } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Examene')
@Controller('examene')
export class ExameneController {
  constructor(private readonly exameneService: ExameneService) {}

  // Get all examene
  @Get()
  @ApiOperation({ summary: 'Get all examene' })
  async getAllExamene() {
    return this.exameneService.getAllExamene();
  }

  // Get an exam by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an exam by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the exam' })
  async getExamById(@Param('id') id_exam: string) {
    return this.exameneService.getExamById(id_exam);
  }

  // Create a new exam
  @Post()
  @ApiOperation({ summary: 'Create a new exam' })
  @ApiBody({
    description: 'Data for creating a new exam',
    schema: {
      type: 'object',
      properties: {
        id_examene: { type: 'string', example: 'exam-001' },
        nume_materie: { type: 'string', example: 'Mathematics' },
        data: { type: 'string', example: '2024-06-15T10:00:00Z' },
        ora: { type: 'string', example: '2024-06-15T10:00:00Z' },
        tip_evaluare: { type: 'string', example: 'Final' },
        actualizatDe: { type: 'string', example: 'admin' },
        actualizatLa: { type: 'string', example: '2024-06-01T12:00:00Z' },
      },
    },
  })
  async createExam(@Body() data: Examene) {
    return this.exameneService.createExam(data);
  }

  // Update an exam by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update an exam by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the exam' })
  @ApiBody({
    description: 'Partial data for updating an exam',
    schema: {
      type: 'object',
      properties: {
        nume_materie: { type: 'string', example: 'Physics' },
        data: { type: 'string', example: '2024-06-20T14:00:00Z' },
        ora: { type: 'string', example: '2024-06-20T14:00:00Z' },
        tip_evaluare: { type: 'string', example: 'Midterm' },
        actualizatDe: { type: 'string', example: 'admin' },
        actualizatLa: { type: 'string', example: '2024-06-02T12:00:00Z' },
      },
    },
  })
  async updateExam(
    @Param('id') id_exam: string,
    @Body() data: Partial<Examene>,
  ) {
    return this.exameneService.updateExam(id_exam, data);
  }

  // Delete an exam by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exam by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the exam' })
  async deleteExam(@Param('id') id_exam: string) {
    return this.exameneService.deleteExam(id_exam);
  }
}
