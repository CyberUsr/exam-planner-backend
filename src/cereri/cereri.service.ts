import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cereri } from '@prisma/client';

@Injectable()
export class CereriService {
  constructor(private prisma: PrismaService) {}

  // Fetch all cereri
  async getAllCereri(): Promise<Cereri[]> {
    return this.prisma.cereri.findMany({
      include: {
        ExameneSali: true, // Include related ExameneSali
        CereriLegatura: true, // Include related CereriLegatura
      },
    });
  }

  // Fetch a single cerere by ID
  async getCerereById(id_cerere: string): Promise<Cereri | null> {
    const cerere = await this.prisma.cereri.findUnique({
      where: { id_cerere },
      include: {
        ExameneSali: true,
        CereriLegatura: true,
      },
    });

    if (!cerere) {
      throw new NotFoundException(`Cerere with ID ${id_cerere} not found.`);
    }

    return cerere;
  }

  // Create a new cerere
  async createCerere(data: Cereri): Promise<Cereri> {
    return this.prisma.cereri.create({
      data,
      include: {
        ExameneSali: true,
        CereriLegatura: true,
      },
    });
  }

  // Update an existing cerere
  async updateCerere(id_cerere: string, data: Partial<Cereri>): Promise<Cereri> {
    const existingCerere = await this.prisma.cereri.findUnique({
      where: { id_cerere },
    });
    if (!existingCerere) {
      throw new NotFoundException(`Cerere with ID ${id_cerere} not found.`);
    }

    return this.prisma.cereri.update({
      where: { id_cerere },
      data,
      include: {
        ExameneSali: true,
        CereriLegatura: true,
      },
    });
  }

  // Delete a cerere by ID
  async deleteCerere(id_cerere: string): Promise<Cereri> {
    const existingCerere = await this.prisma.cereri.findUnique({
      where: { id_cerere },
    });
    if (!existingCerere) {
      throw new NotFoundException(`Cerere with ID ${id_cerere} not found.`);
    }

    return this.prisma.cereri.delete({
      where: { id_cerere },
    });
  }
}
