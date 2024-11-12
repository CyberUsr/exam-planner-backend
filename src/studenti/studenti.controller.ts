import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { StudentiService } from './studenti.service';
import { Studenti } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Studenti')
@Controller('studenti')
export class StudentiController {
  constructor(private readonly studentiService: StudentiService) {}

  // Get all students
  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAllStudenti() {
    return this.studentiService.getAllStudenti();
  }

  // Get a student by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the student' })
  async getStudentById(@Param('id') id_student: string) {
    return this.studentiService.getStudentById(id_student);
  }

  // Create a new student
  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({
    description: 'Data for creating a new student',
    schema: {
      type: 'object',
      properties: {
        id_student: { type: 'string', example: 'stud-001' },
        grupa: { type: 'string', example: 'Grupa 301' },
        anul: { type: 'integer', example: 3 },
        nume: { type: 'string', example: 'Popescu' },
        prenume: { type: 'string', example: 'Ion' },
        specializare: { type: 'string', example: 'Informatics' },
      },
    },
  })
  async createStudent(@Body() data: Studenti) {
    return this.studentiService.createStudent(data);
  }

  // Update a student by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the student' })
  @ApiBody({
    description: 'Partial data for updating a student',
    schema: {
      type: 'object',
      properties: {
        grupa: { type: 'string', example: 'Grupa 302' },
        anul: { type: 'integer', example: 4 },
        nume: { type: 'string', example: 'Ionescu' },
        prenume: { type: 'string', example: 'Andrei' },
        specializare: { type: 'string', example: 'Computer Science' },
      },
    },
  })
  async updateStudent(@Param('id') id_student: string, @Body() data: Partial<Studenti>) {
    return this.studentiService.updateStudent(id_student, data);
  }

  // Delete a student by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the student' })
  async deleteStudent(@Param('id') id_student: string) {
    return this.studentiService.deleteStudent(id_student);
  }
}
