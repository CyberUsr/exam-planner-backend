import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExameneSali } from '@prisma/client';

@Injectable()
export class ExameneSaliService {
  constructor(private prisma: PrismaService) {}

  // Get all examene-sali records
  async getAllExameneSali(): Promise<ExameneSali[]> {
    return this.prisma.exameneSali.findMany({
      include: {
        examene: true, // Include related Examene data
        sala: true, // Include related Sali data
        Cereri: true, // Include related Cereri data
      },
    });
  }

  // Get a specific examene-sali record by ID
  async getExameneSaliById(id_examene_sali: string): Promise<ExameneSali | null> {
    const exameneSali = await this.prisma.exameneSali.findUnique({
      where: { id_examene_sali },
      include: {
        examene: true,
        sala: true,
        Cereri: true,
      },
    });
    if (!exameneSali) {
      throw new NotFoundException(`ExameneSali with ID ${id_examene_sali} not found.`);
    }
    return exameneSali;
  }

  // Create a new examene-sali record
  async createExameneSali(data: ExameneSali): Promise<ExameneSali> {
    return this.prisma.exameneSali.create({
      data,
      include: {
        examene: true,
        sala: true,
        Cereri: true,
      },
    });
  }

  // Update an existing examene-sali record
  async updateExameneSali(id_examene_sali: string, data: Partial<ExameneSali>): Promise<ExameneSali> {
    const existingExameneSali = await this.prisma.exameneSali.findUnique({ where: { id_examene_sali } });
    if (!existingExameneSali) {
      throw new NotFoundException(`ExameneSali with ID ${id_examene_sali} not found.`);
    }

    return this.prisma.exameneSali.update({
      where: { id_examene_sali },
      data,
      include: {
        examene: true,
        sala: true,
        Cereri: true,
      },
    });
  }

  // Delete an examene-sali record by ID
  async deleteExameneSali(id_examene_sali: string): Promise<ExameneSali> {
    const existingExameneSali = await this.prisma.exameneSali.findUnique({ where: { id_examene_sali } });
    if (!existingExameneSali) {
      throw new NotFoundException(`ExameneSali with ID ${id_examene_sali} not found.`);
    }

    return this.prisma.exameneSali.delete({
      where: { id_examene_sali },
    });
  }
}
