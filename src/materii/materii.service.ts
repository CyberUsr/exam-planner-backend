/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Materii, Prisma } from '@prisma/client';

@Injectable()
export class MateriiService {
  constructor(private prisma: PrismaService) {}

  // Create a new subject
  async createMaterie(data: Prisma.MateriiCreateInput): Promise<Materii> {
    try {
      return await this.prisma.materii.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'A subject with this name already exists.',
        );
      }
      throw new BadRequestException('Failed to create subject.');
    }
  }

  // Get all subjects
  async getAllMaterii(): Promise<Materii[]> {
    return this.prisma.materii.findMany({
      include: {
        professors: true,
        assistants: true,
        grupa: true,
        examene: true,
      },
    });
  }

  // Get a subject by ID
  async getMaterieById(id: string): Promise<Materii> {
    const materie = await this.prisma.materii.findUnique({
      where: { id_materie: id },
      include: {
        professors: true,
        assistants: true,
        grupa: true,
        examene: true,
      },
    });

    if (!materie) {
      throw new NotFoundException(`Subject with ID ${id} not found.`);
    }

    return materie;
  }

  // Update a subject
  async updateMaterie(
    id: string,
    data: Prisma.MateriiUpdateInput,
  ): Promise<Materii> {
    try {
      return await this.prisma.materii.update({
        where: { id_materie: id },
        data,
        include: {
          professors: true,
          assistants: true,
          grupa: true,
          examene: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Subject with ID ${id} not found.`);
      }
      throw new BadRequestException('Failed to update subject.');
    }
  }

  // Delete a subject
  async deleteMaterie(id: string): Promise<Materii> {
    try {
      return await this.prisma.materii.delete({
        where: { id_materie: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Subject with ID ${id} not found.`);
      }
      throw new BadRequestException('Failed to delete subject.');
    }
  }

  // Advanced filtering
  async filterMaterii(filters: {
    specializationShortName?: string;
    studyYear?: string;
    groupName?: string;
    facultyName?: string;
  }): Promise<Materii[]> {
    return this.prisma.materii.findMany({
      where: {
        specializationShortName: filters.specializationShortName,
        studyYear: filters.studyYear,
        groupName: filters.groupName,
        professors: filters.facultyName
          ? { some: { facultyName: filters.facultyName } }
          : undefined,
      },
      include: {
        professors: true,
        assistants: true,
        grupa: true,
        examene: true,
      },
    });
  }

  // Force add a subject
  async forceAddMaterie(data: Partial<Materii>): Promise<Materii> {
    if (!data.nume_materie) {
      throw new BadRequestException('Subject name is required.');
    }

    return this.prisma.materii.create({
      data: {
        id_materie: crypto.randomUUID(),
        nume_materie: data.nume_materie,
        specializationShortName: data.specializationShortName,
        studyYear: data.studyYear,
        groupName: data.groupName,
      },
    });
  }

  // Export grouped by specialization
  async exportMateriiGroupedBySpecialization() {
    const materii = await this.prisma.materii.findMany({
      include: {
        professors: true,
        assistants: true,
        examene: true,
        grupa: true,
      },
      orderBy: { specializationShortName: 'asc' },
    });

    return materii.reduce((grouped, materie) => {
      const spec = materie.specializationShortName || 'Unassigned';

      if (!grouped[spec]) {
        grouped[spec] = [];
      }

      grouped[spec].push({
        id: materie.id_materie,
        name: materie.nume_materie,
        studyYear: materie.studyYear,
        groupName: materie.groupName,
        professors: materie.professors.map(
          (prof) => `${prof.firstName} ${prof.lastName}`,
        ),
        assistants: materie.assistants.map(
          (asst) => `${asst.firstName} ${asst.lastName}`,
        ),
        examsCount: materie.examene.length,
      });

      return grouped;
    }, {});
  }

  // Add professors to a subject
  async addProfessorsToMaterie(
    id: string,
    professorIds: string[],
  ): Promise<Materii> {
    return this.prisma.materii.update({
      where: { id_materie: id },
      data: {
        professors: {
          connect: professorIds.map((profId) => ({ id_profesor: profId })),
        },
      },
      include: {
        professors: true,
      },
    });
  }

  // Add assistants to a subject
  async addAssistantsToMaterie(
    id: string,
    assistantIds: string[],
  ): Promise<Materii> {
    return this.prisma.materii.update({
      where: { id_materie: id },
      data: {
        assistants: {
          connect: assistantIds.map((assistId) => ({ id_profesor: assistId })),
        },
      },
      include: {
        assistants: true,
      },
    });
  }
}
