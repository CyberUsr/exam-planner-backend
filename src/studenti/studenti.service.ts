import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Studenti } from '@prisma/client';

@Injectable()
export class StudentiService {
  constructor(private prisma: PrismaService) {}

  // Fetch all students
  async getAllStudenti(): Promise<Studenti[]> {
    return this.prisma.studenti.findMany();
  }

  // Fetch a single student by ID
  async getStudentById(id_student: string): Promise<Studenti | null> {
    const student = await this.prisma.studenti.findUnique({ where: { id_student } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id_student} not found.`);
    }
    return student;
  }

  // Create a new student (without specialization validation)
  async createStudent(data: Studenti): Promise<Studenti> {
    // Directly create the student without checking the specialization
    return this.prisma.studenti.create({
      data,
    });
  }

  // Update an existing student
  async updateStudent(id_student: string, data: Partial<Studenti>): Promise<Studenti> {
    // Check if the student exists
    const existingStudent = await this.prisma.studenti.findUnique({ where: { id_student } });
    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id_student} not found.`);
    }

    // Update the student record
    return this.prisma.studenti.update({
      where: { id_student },
      data,
    });
  }

  // Delete a student by ID
  async deleteStudent(id_student: string): Promise<Studenti> {
    // Check if the student exists
    const existingStudent = await this.prisma.studenti.findUnique({ where: { id_student } });
    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id_student} not found.`);
    }

    // Delete the student record
    return this.prisma.studenti.delete({
      where: { id_student },
    });
  }
}
