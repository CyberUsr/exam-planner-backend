import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Departamente } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class DepartamenteService {
  constructor(private prisma: PrismaService) {}

  // Fetch all departments
  async getAllDepartamente(): Promise<Departamente[]> {
    return this.prisma.departamente.findMany();
  }

  // Fetch a single department by ID
  async getDepartamentById(idDepartament: string): Promise<Departamente | null> {
    const departament = await this.prisma.departamente.findUnique({
      where: { idDepartament },
    });
    if (!departament) {
      throw new NotFoundException(`Department with ID ${idDepartament} not found.`);
    }
    return departament;
  }

  // Create a new department
  async createDepartament(data: Departamente): Promise<Departamente> {
    const existingDepartament = await this.prisma.departamente.findUnique({
      where: { idDepartament: data.idDepartament },
    });

    if (existingDepartament) {
      throw new BadRequestException(`Department with ID ${data.idDepartament} already exists.`);
    }

    return this.prisma.departamente.create({
      data,
    });
  }

  // Update an existing department
  async updateDepartament(
    idDepartament: string,
    data: Partial<Departamente>,
  ): Promise<Departamente> {
    const existingDepartament = await this.prisma.departamente.findUnique({
      where: { idDepartament },
    });
    if (!existingDepartament) {
      throw new NotFoundException(`Department with ID ${idDepartament} not found.`);
    }

    return this.prisma.departamente.update({
      where: { idDepartament },
      data,
    });
  }

  // Delete a department by ID
  async deleteDepartament(idDepartament: string): Promise<Departamente> {
    const existingDepartament = await this.prisma.departamente.findUnique({
      where: { idDepartament },
    });
    if (!existingDepartament) {
      throw new NotFoundException(`Department with ID ${idDepartament} not found.`);
    }

    return this.prisma.departamente.delete({
      where: { idDepartament },
    });
  }

  // Populate departments from external URL
  async populateDepartamente(): Promise<string> {
    const url = 'https://orar.usv.ro/orar/vizualizare/data/facultati.php?json';

    try {
      const response = await axios.get(url);
      const data = response.data;

      for (const item of data) {
        const { id, shortName, longName } = item;

        if (!id || !shortName || !longName) {
          continue; // Skip invalid entries
        }

        await this.prisma.departamente.upsert({
          where: { idDepartament: id },
          update: {
            shortName: shortName.trim(),
            longName: longName.trim(),
          },
          create: {
            idDepartament: id,
            shortName: shortName.trim(),
            longName: longName.trim(),
          },
        });
      }

      return 'Departamente table populated successfully.';
    } catch (error) {
      console.error('Error populating Departamente table:', error);
      throw new Error('Failed to populate Departamente table.');
    }
  }
}
