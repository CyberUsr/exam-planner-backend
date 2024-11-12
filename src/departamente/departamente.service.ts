import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Departamente } from '@prisma/client';

@Injectable()
export class DepartamenteService {
  constructor(private prisma: PrismaService) {}

  // Fetch all departments
  async getAllDepartamente(): Promise<Departamente[]> {
    return this.prisma.departamente.findMany();
  }

  // Fetch a single department by ID
  async getDepartamentById(id_departament: string): Promise<Departamente | null> {
    const departament = await this.prisma.departamente.findUnique({
      where: { id_departament },
    });
    if (!departament) {
      throw new NotFoundException(`Department with ID ${id_departament} not found.`);
    }
    return departament;
  }

  // Create a new department
  async createDepartament(data: Departamente): Promise<Departamente> {
    return this.prisma.departamente.create({
      data,
    });
  }

  // Update an existing department
  async updateDepartament(
    id_departament: string,
    data: Partial<Departamente>,
  ): Promise<Departamente> {
    const existingDepartament = await this.prisma.departamente.findUnique({
      where: { id_departament },
    });
    if (!existingDepartament) {
      throw new NotFoundException(`Department with ID ${id_departament} not found.`);
    }

    return this.prisma.departamente.update({
      where: { id_departament },
      data,
    });
  }

  // Delete a department by ID
  async deleteDepartament(id_departament: string): Promise<Departamente> {
    const existingDepartament = await this.prisma.departamente.findUnique({
      where: { id_departament },
    });
    if (!existingDepartament) {
      throw new NotFoundException(`Department with ID ${id_departament} not found.`);
    }

    return this.prisma.departamente.delete({
      where: { id_departament },
    });
  }
}
