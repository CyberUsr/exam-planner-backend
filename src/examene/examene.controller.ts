/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ExameneService } from './examene.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Examene')
@Controller('examene')
export class ExameneController {
  constructor(private readonly exameneService: ExameneService) {}

  // Export exams grouped by day
  @Get('export')
  @ApiOperation({ summary: 'Export exams grouped by day' })
  async exportExamsGroupedByDay() {
    try {
      const groupedExams = await this.exameneService.exportExamsGroupedByDay();
      return groupedExams;
    } catch (error) {
      throw new BadRequestException('Failed to export exams grouped by day');
    }
  }

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

  @Post()
  @ApiOperation({ summary: 'Create a new exam' })
  @ApiBody({
    description: 'Data for creating a new exam',
    schema: {
      type: 'object',
      properties: {
        nume_materie: { type: 'string', example: 'Mathematics' },
        data: { type: 'string', example: '2024-06-15' }, // Only date part
        ora: { type: 'string', example: '10:00:00' }, // Only time part
        tip_evaluare: { type: 'string', example: 'Final' },
        actualizatDe: { type: 'string', example: 'admin' },
        professors: {
          type: 'array',
          items: { type: 'string' },
          example: ['1704'],
        },
        assistants: {
          type: 'array',
          items: { type: 'string' },
          example: ['1546'],
        },
      },
    },
  })
  async createExam(
    @Body()
    data: {
      nume_materie: string;
      data: string; // Date in YYYY-MM-DD
      ora: string; // Time in HH:mm:ss
      tip_evaluare: string;
      actualizatDe: string;
      professors: string[];
      assistants: string[];
    },
  ) {
    try {
      // Step 1: Find id_materie by nume_materie
      const materie = await this.exameneService.findMaterieByName(
        data.nume_materie,
      );
      if (!materie) {
        throw new BadRequestException(
          `Subject with name ${data.nume_materie} not found.`,
        );
      }

      // Step 2: Pass data to service with the found id_materie
      return this.exameneService.createExam({
        id_materie: materie.id_materie,
        data: data.data,
        ora: data.ora,
        tip_evaluare: data.tip_evaluare,
        actualizatDe: data.actualizatDe,
        professors: data.professors,
        assistants: data.assistants,
      });
    } catch (error) {
      throw new BadRequestException(`Error creating exam: ${error.message}`);
    }
  }

  // Update an exam
  @Put(':id')
  @ApiOperation({ summary: 'Update an exam by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the exam' })
  @ApiBody({
    description: 'Partial data for updating an exam',
    schema: {
      type: 'object',
      properties: {
        nume_materie: { type: 'string', example: 'Physics' },
        data: {
          type: 'string',
          example: '2024-06-20T14:00:00Z',
          description: 'Full ISO date-time string',
        },
        tip_evaluare: { type: 'string', example: 'Midterm' },
        actualizatDe: { type: 'string', example: 'admin' },
        actualizatLa: {
          type: 'string',
          example: '2024-06-02T12:00:00Z',
          description: 'Optional update timestamp',
        },
        professors: {
          type: 'array',
          items: { type: 'string' },
          example: ['1704', '1705'],
        },
        assistants: {
          type: 'array',
          items: { type: 'string' },
          example: ['1546'],
        },
      },
    },
  })
  async updateExam(
    @Param('id') id_exam: string,
    @Body()
    data: {
      nume_materie?: string;
      data?: string;
      tip_evaluare?: string;
      actualizatDe?: string;
      actualizatLa?: string;
      professors?: string[];
      assistants?: string[];
    },
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

  // Check professor/assistant availability
  @Get('availability/:professorId/:date/:time')
  @ApiOperation({ summary: 'Check professor/assistant availability' })
  async checkAvailability(
    @Param('professorId') professorId: string,
    @Param('date') date: string,
    @Param('time') time: string, // Ensure time is passed as a string
  ) {
    const isAvailable = await this.exameneService.checkAvailability(
      professorId,
      new Date(date), // Convert date string to Date object
      time, // Pass time string directly
    );
    return { available: isAvailable };
  }

  @Get('filter/:faculty')
  @ApiOperation({ summary: 'Filter exams by faculty' })
  async filterExamsByFaculty(@Param('faculty') faculty: string) {
    return this.exameneService.filterExamsByFaculty(faculty);
  }

  // Force add a new exam
  @Post('force-add')
  @ApiOperation({ summary: 'Force add a new exam' })
  @ApiBody({
    description: 'Data for forcefully adding a new exam',
    schema: {
      type: 'object',
      properties: {
        id_materie: { type: 'string', example: 'abc123' },
        data: { type: 'string', example: '2024-06-15T10:00:00Z' },
        ora: { type: 'string', example: '10:00' },
        tip_evaluare: { type: 'string', example: 'Final' },
        actualizatDe: { type: 'string', example: 'admin' },
        id_grupa: { type: 'string', example: 'group1', nullable: true },
        ExameneSali: {
          type: 'array',
          items: {
            type: 'object',
            properties: { id_sala: { type: 'string', example: 'sala1' } },
          },
        },
      },
    },
  })
  async forceAddExam(
    @Body()
    data: {
      id_materie: string;
      data: string;
      ora: string;
      tip_evaluare: string;
      actualizatDe: string;
      id_grupa?: string;
      ExameneSali?: { id_sala: string }[];
    },
  ) {
    try {
      return await this.exameneService.forceAddExam(data);
    } catch (error) {
      console.error('Error forcefully creating exam:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get('filter')
  @ApiOperation({
    summary: 'Filter exams by specialization, year, and group',
  })
  async filterExams(
    @Query('specialization') specialization: string,
    @Query('year') year: string,
    @Query('group') group: string,
  ) {
    try {
      return await this.exameneService.filterExams(specialization, year, group);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //survey
}
