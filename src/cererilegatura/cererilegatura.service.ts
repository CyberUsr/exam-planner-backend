import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CereriLegatura } from '@prisma/client';

@Injectable()
export class CereriLegaturaService {
  constructor(private prisma: PrismaService) {}

  // Get all cereri-legatura records
  async getAllCereriLegatura(): Promise<CereriLegatura[]> {
    return this.prisma.cereriLegatura.findMany({
      include: {
        cereri: true, // Include related Cereri data
        student: true, // Include related Studenti data
        profesor: true, // Include related Profesori data
      },
    });
  }

  // Get a specific cereri-legatura record by ID
  async getCereriLegaturaById(id_legatura: string): Promise<CereriLegatura | null> {
    const cereriLegatura = await this.prisma.cereriLegatura.findUnique({
      where: { id_legatura },
      include: {
        cereri: true,
        student: true,
        profesor: true,
      },
    });
    if (!cereriLegatura) {
      throw new NotFoundException(`CereriLegatura with ID ${id_legatura} not found.`);
    }
    return cereriLegatura;
  }

  // Create a new cereri-legatura record
  async createCereriLegatura(data: CereriLegatura): Promise<CereriLegatura> {
    return this.prisma.cereriLegatura.create({
      data,
      include: {
        cereri: true,
        student: true,
        profesor: true,
      },
    });
  }

  // Update an existing cereri-legatura record
  async updateCereriLegatura(id_legatura: string, data: Partial<CereriLegatura>): Promise<CereriLegatura> {
    const existingCereriLegatura = await this.prisma.cereriLegatura.findUnique({ where: { id_legatura } });
    if (!existingCereriLegatura) {
      throw new NotFoundException(`CereriLegatura with ID ${id_legatura} not found.`);
    }

    return this.prisma.cereriLegatura.update({
      where: { id_legatura },
      data,
      include: {
        cereri: true,
        student: true,
        profesor: true,
      },
    });
  }

  // Delete a cereri-legatura record by ID
  async deleteCereriLegatura(id_legatura: string): Promise<CereriLegatura> {
    const existingCereriLegatura = await this.prisma.cereriLegatura.findUnique({ where: { id_legatura } });
    if (!existingCereriLegatura) {
      throw new NotFoundException(`CereriLegatura with ID ${id_legatura} not found.`);
    }

    return this.prisma.cereriLegatura.delete({
      where: { id_legatura },
    });
  }
}
