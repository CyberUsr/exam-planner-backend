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
    return this.prisma.examene.findMany({
      include: {
        materie: true,
        grupa: true,
        ExameneSali: {
          include: { sala: true },
        },
      },
    });
  }

  // Fetch a single exam by ID
  async getExamById(id_exam: string): Promise<Examene> {
    const exam = await this.prisma.examene.findUnique({
      where: { id_examene: id_exam },
      include: {
        materie: true,
        grupa: true,
        ExameneSali: {
          include: { sala: true },
        },
      },
    });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }
    return exam;
  }

  async createExam(data: {
    id_materie: string;
    data: string; // Date part (YYYY-MM-DD)
    ora: string; // Time part (HH:mm:ss)
    tip_evaluare: string;
    actualizatDe: string;
    professors: string[]; // List of professor IDs
    assistants: string[]; // List of assistant IDs
  }): Promise<Examene> {
    try {
      // Combine and validate date and time
      const combinedDateTime = new Date(`${data.data}T${data.ora}`);
      if (isNaN(combinedDateTime.getTime())) {
        throw new BadRequestException('Invalid date or time format.');
      }

      // Create the exam in the database
      const exam = await this.prisma.examene.create({
        data: {
          id_examene: crypto.randomUUID(),
          id_materie: data.id_materie,
          data: combinedDateTime, // Use the combined date and time
          ora: combinedDateTime, // Prisma expects a valid Date object
          tip_evaluare: data.tip_evaluare,
          actualizatDe: data.actualizatDe,
          actualizatLa: new Date(), // Current timestamp
          ExameneSali: {
            create: [], // Handle ExameneSali if needed
          },
        },
      });

      // Associate professors with the `Materii` record
      for (const professorId of data.professors) {
        await this.prisma.profesori.update({
          where: { id_profesor: professorId },
          data: {
            examene_as_professor: {
              connect: { id_materie: data.id_materie }, // Link to `id_materie` instead of `id_examene`
            },
          },
        });
      }

      // Associate assistants with the `Materii` record
      for (const assistantId of data.assistants) {
        await this.prisma.profesori.update({
          where: { id_profesor: assistantId },
          data: {
            examene_as_assistant: {
              connect: { id_materie: data.id_materie }, // Link to `id_materie` instead of `id_examene`
            },
          },
        });
      }

      return exam;
    } catch (error) {
      console.error('Error creating exam:', error);
      throw new BadRequestException(`Failed to create exam: ${error.message}`);
    }
  }

  // Update an exam
  async updateExam(
    id_exam: string,
    data: {
      id_materie?: string;
      data?: string;
      ora?: string;
      tip_evaluare?: string;
      actualizatDe?: string;
      id_grupa?: string;
      ExameneSali?: { id_sala: string }[];
    },
  ): Promise<Examene> {
    const existingExam = await this.prisma.examene.findUnique({
      where: { id_examene: id_exam },
    });

    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }

    let combinedDateTime: Date | undefined;
    if (data.data) {
      combinedDateTime = new Date(data.data);
      if (isNaN(combinedDateTime.getTime())) {
        throw new BadRequestException('Invalid date provided.');
      }
    }

    const updateData: any = {
      id_materie: data.id_materie,
      data: combinedDateTime || existingExam.data,
      ora: data.ora ? new Date(`${data.data}T${data.ora}`) : existingExam.ora,
      tip_evaluare: data.tip_evaluare,
      actualizatDe: data.actualizatDe,
      actualizatLa: new Date(),
      id_grupa: data.id_grupa || existingExam.id_grupa,
    };

    if (data.ExameneSali) {
      updateData.ExameneSali = {
        deleteMany: {}, // Clear existing relations
        create: data.ExameneSali.map((sala) => ({ id_sala: sala.id_sala })),
      };
    }

    try {
      return await this.prisma.examene.update({
        where: { id_examene: id_exam },
        data: updateData,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update exam.');
    }
  }

  // Delete an exam
  async deleteExam(id_exam: string): Promise<Examene> {
    const existingExam = await this.prisma.examene.findUnique({
      where: { id_examene: id_exam },
    });
    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id_exam} not found.`);
    }

    return this.prisma.examene.delete({
      where: { id_examene: id_exam },
    });
  }

  // Check availability of a professor or assistant
  async checkAvailability(professorId: string, date: Date, time: string) {
    const combinedDateTime = new Date(
      `${date.toISOString().split('T')[0]}T${time}`,
    );

    if (isNaN(combinedDateTime.getTime())) {
      throw new BadRequestException('Invalid date or time provided.');
    }

    // Remove the id_profesor filter
    const conflicts = await this.prisma.examene.findMany({
      where: {
        AND: [{ data: date }, { ora: combinedDateTime }],
      },
    });

    return conflicts.length === 0;
  }
  // Find materie by name
  async findMaterieByName(nume_materie: string) {
    const materie = await this.prisma.materii.findUnique({
      where: { nume_materie },
    });

    if (!materie) {
      throw new NotFoundException(
        `Materie with name '${nume_materie}' not found.`,
      );
    }
    return materie;
  }

  // Filter exams by faculty
  async filterExamsByFaculty(specializationShortName: string) {
    if (!specializationShortName) {
      throw new BadRequestException('Specialization short name is required.');
    }

    return this.prisma.examene.findMany({
      where: {
        materie: {
          specializationShortName: specializationShortName, // Use the appropriate field
        },
      },
      include: {
        materie: true,
        grupa: true,
        ExameneSali: { include: { sala: true } },
      },
      orderBy: { data: 'asc' },
    });
  }

  // Export exams grouped by day
  async exportExamsGroupedByDay() {
    const exams = await this.prisma.examene.findMany({
      include: {
        materie: true,
        grupa: true,
        ExameneSali: {
          include: { sala: true },
        },
      },
      orderBy: { data: 'asc' },
    });

    const groupedExams = exams.reduce((grouped, exam) => {
      const date = exam.data.toISOString().split('T')[0];
      if (!grouped[date]) grouped[date] = [];

      grouped[date].push({
        id: exam.id_examene,
        subject: exam.materie.nume_materie, // Changed from 'nume'
        // ... rest of the code remains the same
      });

      return grouped;
    }, {});

    return groupedExams;
  }
  // Filter exams
  async filterExams(specialization: string, year: string, group: string) {
    if (!specialization || !year || !group) {
      throw new BadRequestException('All filtering parameters are required.');
    }

    return this.prisma.examene.findMany({
      where: {
        grupa: {
          specializationShortName: specialization,
          studyYear: year,
          groupName: group,
        },
      },
      include: {
        materie: true,
        grupa: true,
        ExameneSali: { include: { sala: true } },
      },
      orderBy: { data: 'asc' },
    });
  }
  async forceAddExam(data: {
    id_materie: string;
    data: string; // ISO format for combined date and time
    ora: string; // Time format
    tip_evaluare: string;
    actualizatDe: string;
    id_grupa?: string;
    ExameneSali?: { id_sala: string }[];
  }): Promise<Examene> {
    const combinedDateTime = new Date(data.data);

    // Minimal validation to ensure dates and IDs are provided
    if (isNaN(combinedDateTime.getTime())) {
      throw new BadRequestException('Invalid date provided.');
    }

    // Direct database insertion without checks
    return this.prisma.examene.create({
      data: {
        id_examene: crypto.randomUUID(),
        id_materie: data.id_materie,
        data: combinedDateTime,
        ora: new Date(`${data.data}T${data.ora}`),
        tip_evaluare: data.tip_evaluare,
        actualizatDe: data.actualizatDe,
        actualizatLa: new Date(),
        id_grupa: data.id_grupa || null,
        ExameneSali: {
          create:
            data.ExameneSali?.map((sala) => ({ id_sala: sala.id_sala })) || [],
        },
      },
    });
  }
  //survey
}
