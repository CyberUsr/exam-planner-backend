import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Materii, Prisma, Examene } from '@prisma/client';

// Common include pattern for related entities
const MATERII_INCLUDE = {
  professors: true,
  assistants: true,
} as const;

@Injectable()
export class MateriiService {
  constructor(private readonly prisma: PrismaService) {}

  async createMaterie(data: Prisma.MateriiCreateInput): Promise<Materii> {
    try {
      return await this.prisma.materii.create({
        data,
        include: MATERII_INCLUDE,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'A subject with this name already exists',
        );
      }
      throw new BadRequestException('Failed to create subject');
    }
  }

  async getAllMaterii(): Promise<Materii[]> {
    try {
      return await this.prisma.materii.findMany({
        include: MATERII_INCLUDE,
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
      include: MATERII_INCLUDE,
    });

    if (!materie) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    return materie;
  }

  async updateMaterie(
    id: string,
    data: Prisma.MateriiUpdateInput,
  ): Promise<Materii> {
    if (!id) {
      throw new BadRequestException('Subject ID is required');
    }

    try {
      return await this.prisma.materii.update({
        where: { id_materie: id },
        data,
        include: MATERII_INCLUDE,
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
        include: MATERII_INCLUDE,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete subject');
    }
  }

  async addProfessorsToMaterie(
    materieName: string,
    professorNames: { firstName: string; lastName: string }[], // Removed examId
  ): Promise<Materii> { // Changed return type to Materii
    if (!materieName || !professorNames?.length) {
      throw new BadRequestException(
        'Subject Name and at least one professor name are required'
      );
    }
  
    try {
      // First, find the subject by name
      const materie = await this.prisma.materii.findUnique({
        where: { nume_materie: materieName }
      });
  
      if (!materie) {
        throw new NotFoundException(`Subject with name ${materieName} not found`);
      }
  
      // Find professors by first and last names
      const professorConnections = await Promise.all(
        professorNames.map(async (name) => {
          const professor = await this.prisma.profesori.findFirst({
            where: {
              firstName: name.firstName,
              lastName: name.lastName
            }
          });
  
          if (!professor) {
            throw new NotFoundException(
              `Professor ${name.firstName} ${name.lastName} not found`
            );
          }
  
          return professor;
        })
      );
  
      // Update the subject with found professors
      return await this.prisma.materii.update({
        where: { id_materie: materie.id_materie },
        data: {
          professors: {
            connect: professorConnections.map(professor => ({ 
              id_profesor: professor.id_profesor 
            }))
          }
        },
        include: {
          professors: {
            select: {
              id_profesor: true,
              firstName: true,
              lastName: true,
              emailAddress: true,
              departmentName: true
            }
          },
          assistants: {
            select: {
              id_profesor: true,
              firstName: true,
              lastName: true,
              emailAddress: true,
              departmentName: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to add professors to subject');
    }
  }
  
  async addAssistantsToMaterie(
    materieName: string,
    assistantNames: { firstName: string; lastName: string }[], // Removed id_materie
   
  ): Promise<Materii> { // Changed return type to Materii
    if (!materieName || !assistantNames?.length ) {
      throw new BadRequestException(
        'Subject Name, Exam ID, and at least one assistant name are required'
      );
    }
  
    try {
      // First, find the subject by name
      const materie = await this.prisma.materii.findUnique({
        where: { nume_materie: materieName }
      });
  
      if (!materie) {
        throw new NotFoundException(`Subject with name ${materieName} not found`);
      }
  
      // Find assistants by first and last names
      const assistantConnections = await Promise.all(
        assistantNames.map(async (name) => {
          const assistant = await this.prisma.profesori.findFirst({
            where: {
              firstName: name.firstName,
              lastName: name.lastName
            }
          });
  
          if (!assistant) {
            throw new NotFoundException(
              `Assistant ${name.firstName} ${name.lastName} not found`
            );
          }
  
          return assistant;
        })
      );
  
      // Update the subject with found assistants
      return await this.prisma.materii.update({
        where: { id_materie: materie.id_materie },
        data: {
          assistants: {
            connect: assistantConnections.map(assistant => ({ 
              id_profesor: assistant.id_profesor 
            }))
          }
        },
        include: {
          assistants: {
            select: {
              id_profesor: true,
              firstName: true,
              lastName: true,
              emailAddress: true,
              departmentName: true
            }
          },
          professors: {
            select: {
              id_profesor: true,
              firstName: true,
              lastName: true,
              emailAddress: true,
              departmentName: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to add assistants to subject');
    }
  }
}