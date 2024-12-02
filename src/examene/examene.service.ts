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
    try {
      const exams = await this.prisma.examene.findMany({
        include: {
          professors: true,
          assistants: true,
          ExameneSali: {
            include: {
              sala: true, // Include sala details
            },
          },
        },
        orderBy: { data: 'asc' }, // Order by date
      });

      // Group exams by date
      const groupedExams = exams.reduce((grouped, exam) => {
        // Extract and format the date
        const date =
          exam.data instanceof Date
            ? exam.data.toISOString().split('T')[0]
            : new Date(exam.data).toISOString().split('T')[0];

        if (!grouped[date]) {
          grouped[date] = []; // Initialize an array for the date
        }

        // Format professors and assistants
        const formattedProfessors = exam.professors.map((prof) =>
          prof.firstName && prof.lastName
            ? `${prof.firstName} ${prof.lastName}`
            : prof.id_profesor,
        );
        const formattedAssistants = exam.assistants.map((asst) =>
          asst.firstName && asst.lastName
            ? `${asst.firstName} ${asst.lastName}`
            : asst.id_profesor,
        );

        // Include the room details
        const formattedRooms =
          exam.ExameneSali?.map((room) => ({
            roomName: room.sala?.nume || room.id_sala,
            building: room.sala?.buildingName || 'Unknown',
          })) || [];

        // Add exam to the grouped object
        grouped[date].push({
          id: exam.id_examene,
          subject: exam.nume_materie,
          time: exam.ora.toISOString().split('T')[1], // Extract time
          examType: exam.tip_evaluare,
          updatedBy: exam.actualizatDe,
          updatedAt: exam.actualizatLa.toISOString(),
          professors: formattedProfessors,
          assistants: formattedAssistants,
          rooms: formattedRooms,
        });

        return grouped;
      }, {});

      return groupedExams; // Return the grouped data
    } catch (error) {
      console.error('Error in exportExamsGroupedByDay:', error);
      throw new BadRequestException('Failed to export exams grouped by day');
    }
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

  async filterExams(specialization: string, year: string, group: string) {
    if (!specialization || !year || !group) {
      throw new BadRequestException('All filtering parameters are required');
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
        professors: true,
        assistants: true,
        ExameneSali: {
          include: {
            sala: true,
          },
        },
        grupa: true, // Include group details if needed
      },
      orderBy: {
        data: 'asc', // Order by exam date
      },
    });
  }
}
