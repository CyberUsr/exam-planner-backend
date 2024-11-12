import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profesori } from '@prisma/client';


@Injectable()
export class ProfesoriService {
  constructor(private prisma: PrismaService) {}

  async getAllProfesori(): Promise<Profesori[]> {
    return this.prisma.profesori.findMany();
  }

  async getProfesorById(id_profesor: string): Promise<Profesori | null> {
    return this.prisma.profesori.findUnique({ where: { id_profesor } });
  }

  async createProfesor(data: Profesori): Promise<Profesori> {
    // Check if the provided id_departament exists
    const departmentExists = await this.prisma.departamente.findUnique({
      where: { id_departament: data.id_departament },
    });

    if (!departmentExists) {
      throw new BadRequestException('The specified department does not exist.');
    }

    // Create the professor
    return this.prisma.profesori.create({
      data,
    });
  }

  async updateProfesor(id_profesor: string, data: Partial<Profesori>): Promise<Profesori> {
    return this.prisma.profesori.update({
      where: { id_profesor },
      data,
    });
  }

  async deleteProfesor(id_profesor: string): Promise<Profesori> {
    return this.prisma.profesori.delete({ where: { id_profesor } });
  }
}
