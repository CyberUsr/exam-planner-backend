import { 
  Injectable, 
  NotFoundException, 
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Materii, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { GroupedMateriiType } from './types/grouped-materii.type';

// Common types
interface MateriiFilters {
  specializationShortName?: string;
  studyYear?: string;
  groupName?: string;
  facultyName?: string;
}

// Common include pattern for related entities
const MATERII_INCLUDE = {
  professors: true,
  assistants: true,
  grupa: true,
  examene: true,
} as const;

@Injectable()
export class MateriiService {
  constructor(private readonly prisma: PrismaService) {}

  async createMaterie(data: Prisma.MateriiCreateInput): Promise<Materii> {
    try {
      return await this.prisma.materii.create({ 
        data,
        include: MATERII_INCLUDE
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('A subject with this name already exists');
      }
      throw new BadRequestException('Failed to create subject');
    }
  }

  async getAllMaterii(): Promise<Materii[]> {
    try {
      return await this.prisma.materii.findMany({
        include: MATERII_INCLUDE
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch subjects');
    }
  }

  async getMaterieById(id: string): Promise<Materii> {
    if (!id) {
      throw new BadRequestException('Subject ID is required');
    }

    const materie = await this.prisma.materii.findUnique({
      where: { id_materie: id },
      include: MATERII_INCLUDE
    });

    if (!materie) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    return materie;
  }

  async updateMaterie(id: string, data: Prisma.MateriiUpdateInput): Promise<Materii> {
    if (!id) {
      throw new BadRequestException('Subject ID is required');
    }

    try {
      return await this.prisma.materii.update({
        where: { id_materie: id },
        data,
        include: MATERII_INCLUDE
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to update subject');
    }
  }

  async deleteMaterie(id: string): Promise<Materii> {
    if (!id) {
      throw new BadRequestException('Subject ID is required');
    }

    try {
      return await this.prisma.materii.delete({ 
        where: { id_materie: id },
        include: MATERII_INCLUDE
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete subject');
    }
  }

  async filterMaterii(filters: MateriiFilters): Promise<Materii[]> {
    try {
      const where: Prisma.MateriiWhereInput = {
        specializationShortName: filters.specializationShortName,
        studyYear: filters.studyYear,
        groupName: filters.groupName,
        ...(filters.facultyName && {
          professors: {
            some: { facultyName: filters.facultyName }
          }
        })
      };

      return await this.prisma.materii.findMany({
        where,
        include: MATERII_INCLUDE
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to filter subjects');
    }
  }

  async addProfessorsToMaterie(id: string, professorIds: string[]): Promise<Materii> {
    if (!id || !professorIds?.length) {
      throw new BadRequestException('Subject ID and at least one professor ID are required');
    }

    try {
      return await this.prisma.materii.update({
        where: { id_materie: id },
        data: {
          professors: {
            connect: professorIds.map(profId => ({ id_profesor: profId }))
          }
        },
        include: MATERII_INCLUDE
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to add professors to subject');
    }
  }

  async addAssistantsToMaterie(id: string, assistantIds: string[]): Promise<Materii> {
    if (!id || !assistantIds?.length) {
      throw new BadRequestException('Subject ID and at least one assistant ID are required');
    }

    try {
      return await this.prisma.materii.update({
        where: { id_materie: id },
        data: {
          assistants: {
            connect: assistantIds.map(assistId => ({ id_profesor: assistId }))
          }
        },
        include: MATERII_INCLUDE
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to add assistants to subject');
    }
  }

  async exportMateriiGroupedBySpecialization(): Promise<GroupedMateriiType> {
    try {
      const materii = await this.prisma.materii.findMany({
        include: MATERII_INCLUDE,
        orderBy: { specializationShortName: 'asc' }
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
          professors: materie.professors.map(prof => 
            prof.firstName && prof.lastName
              ? `${prof.firstName} ${prof.lastName}`
              : prof.id_profesor
          ),
          assistants: materie.assistants.map(asst => 
            asst.firstName && asst.lastName
              ? `${asst.firstName} ${asst.lastName}`
              : asst.id_profesor
          ),
          examsCount: materie.examene.length
        });

        return grouped;
      }, {} as GroupedMateriiType);
    } catch (error) {
      throw new InternalServerErrorException('Failed to export subjects grouped by specialization');
    }
  }
}
