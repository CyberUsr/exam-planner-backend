/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const exam = await this.prisma.examene.findUnique({
      where: { id_examene: id_exam },
    });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }
    return exam;
  }

  async createExam(data: {
    nume_materie: string;
    data: Date;
    ora: Date;
    tip_evaluare: string;
    actualizatDe: string;
  }): Promise<Examene> {
    return this.prisma.examene.create({
      data: {
        id_examene: crypto.randomUUID(), // Generate a unique ID
        ...data,
        actualizatLa: new Date(), // Auto-update timestamp
      },
    });
  }

  // Update an existing exam
  async updateExam(id_exam: string, data: Partial<Examene>): Promise<Examene> {
    // Check if the exam exists
    const existingExam = await this.prisma.examene.findUnique({
      where: { id_examene: id_exam },
    });
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
    const existingExam = await this.prisma.examene.findUnique({
      where: { id_examene: id_exam },
    });
    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }

    // Delete the exam record
    return this.prisma.examene.delete({
      where: { id_examene: id_exam },
    });
  }
}
