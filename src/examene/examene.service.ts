/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    data: string; // ISO format for combined date and time
    ora: string; // Time format
    tip_evaluare: string;
    actualizatDe: string;
    professors: string[]; // Array of professor IDs
    assistants: string[]; // Array of assistant IDs
  }): Promise<Examene> {
    const combinedDateTime = new Date(data.data);

    if (!combinedDateTime || isNaN(combinedDateTime.getTime())) {
      throw new Error('Invalid date or time provided.');
    }

    return this.prisma.examene.create({
      data: {
        id_examene: crypto.randomUUID(),
        nume_materie: data.nume_materie,
        data: combinedDateTime,
        ora: combinedDateTime,
        tip_evaluare: data.tip_evaluare,
        actualizatDe: data.actualizatDe,
        actualizatLa: new Date(),
        professors: {
          connect: data.professors.map((id) => ({ id_profesor: id })),
        },
        assistants: {
          connect: data.assistants.map((id) => ({ id_profesor: id })),
        },
      },
    });
  }
  // In examene.service.ts
  async updateExam(
    id_exam: string,
    data: {
      nume_materie?: string;
      data?: string; // ISO format for combined date and time
      ora?: string; // Time format (e.g., "14:00:00")
      tip_evaluare?: string;
      actualizatDe?: string;
      actualizatLa?: string; // ISO format for datetime
      professors?: string[];
      assistants?: string[];
    },
  ): Promise<Examene> {
    // Check if the exam exists
    const existingExam = await this.prisma.examene.findUnique({
      where: { id_examene: id_exam },
    });

    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }

    // Combine `data` and `ora` into a single Date object
    let combinedDateTime: Date | undefined;
    if (data.data) {
      combinedDateTime = new Date(data.data);

      if (!combinedDateTime || isNaN(combinedDateTime.getTime())) {
        throw new BadRequestException('Invalid date or time provided.');
      }
    }

    // Prepare data for update
    const updateData: any = {
      nume_materie: data.nume_materie,
      data: combinedDateTime || existingExam.data,
      ora: combinedDateTime || existingExam.ora,
      tip_evaluare: data.tip_evaluare,
      actualizatDe: data.actualizatDe,
      actualizatLa: data.actualizatLa
        ? new Date(data.actualizatLa)
        : new Date(),
    };

    // Update professors and assistants relationships
    if (data.professors) {
      updateData.professors = {
        set: data.professors.map((id) => ({ id_profesor: id })),
      };
    }

    if (data.assistants) {
      updateData.assistants = {
        set: data.assistants.map((id) => ({ id_profesor: id })),
      };
    }

    // Execute the update
    try {
      return await this.prisma.examene.update({
        where: { id_examene: id_exam },
        data: updateData,
      });
    } catch (error) {
      console.error('Error updating exam:', error);
      throw new BadRequestException('Failed to update exam');
    }
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

  async checkAvailability(professorId: string, date: Date, time: string) {
    // Combine date and time into a single Date object
    const combinedDateTime = new Date(
      `${date.toISOString().split('T')[0]}T${time}`,
    );

    // Validate the constructed Date
    if (isNaN(combinedDateTime.getTime())) {
      throw new Error('Invalid date or time provided');
    }

    const conflicts = await this.prisma.examene.findMany({
      where: {
        AND: [
          { data: date },
          { ora: combinedDateTime },
          {
            OR: [
              { professors: { some: { id_profesor: professorId } } },
              { assistants: { some: { id_profesor: professorId } } },
            ],
          },
        ],
      },
    });

    return conflicts.length === 0; // Returns true if no conflicts
  }

  async filterExamsByFaculty(facultyName: string) {
    return this.prisma.examene.findMany({
      where: {
        professors: { some: { facultyName } },
      },
      include: { professors: true, assistants: true },
    });
  }

  async exportExamsGroupedByDay() {
    const exams = await this.prisma.examene.findMany({
      include: { professors: true, assistants: true, ExameneSali: true },
    });

    console.log('Retrieved exams:', exams);

    // Group exams by date
    return exams.reduce((grouped, exam) => {
      const date = exam.data.toISOString().split('T')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(exam);
      return grouped;
    }, {});
  }

  async forceAddExam(data: Partial<Examene>): Promise<Examene> {
    // Ensure required fields are present
    if (
      !data.nume_materie ||
      !data.data ||
      !data.ora ||
      !data.tip_evaluare ||
      !data.actualizatDe
    ) {
      throw new Error('Missing required fields for creating an exam');
    }

    return this.prisma.examene.create({
      data: {
        id_examene: crypto.randomUUID(),
        nume_materie: data.nume_materie,
        data: data.data,
        ora: data.ora,
        tip_evaluare: data.tip_evaluare,
        actualizatDe: data.actualizatDe,
        actualizatLa: new Date(), // Add the current timestamp
      },
    });
  }
}
