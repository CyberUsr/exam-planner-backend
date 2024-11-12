import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Examene } from '@prisma/client';

@Injectable()
export class ExameneService {
  constructor(private prisma: PrismaService) {}

  // Fetch all exams
  async getAllExamene(): Promise<Examene[]> {
    return this.prisma.examene.findMany();
  }

  // Fetch a single exam by ID
  async getExamById(id_exam: string): Promise<Examene | null> {
    const exam = await this.prisma.examene.findUnique({ where: { id_examene: id_exam } });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }
    return exam;
  }

  // Create a new exam
  async createExam(data: Examene): Promise<Examene> {
    // Directly create the exam without any additional checks
    return this.prisma.examene.create({
      data,
    });
  }

  // Update an existing exam
  async updateExam(id_exam: string, data: Partial<Examene>): Promise<Examene> {
    // Check if the exam exists
    const existingExam = await this.prisma.examene.findUnique({ where: { id_examene: id_exam } });
    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }

    // Update the exam record
    return this.prisma.examene.update({
      where: { id_examene: id_exam },
      data,
    });
  }

  // Delete an exam by ID
  async deleteExam(id_exam: string): Promise<Examene> {
    // Check if the exam exists
    const existingExam = await this.prisma.examene.findUnique({ where: { id_examene: id_exam } });
    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }

    // Delete the exam record
    return this.prisma.examene.delete({
      where: { id_examene: id_exam },
    });
  }
}
