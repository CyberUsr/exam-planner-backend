import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Sali } from '@prisma/client';

@Injectable()
export class SaliService {
  constructor(private prisma: PrismaService) {}

  // Fetch all rooms (sali)
  async getAllSali(): Promise<Sali[]> {
    return this.prisma.sali.findMany();
  }

  // Fetch a single room by ID
  async getSalaById(id_sala: string): Promise<Sali | null> {
    const sala = await this.prisma.sali.findUnique({ where: { id_sala } });
    if (!sala) {
      throw new NotFoundException(`Room with ID ${id_sala} not found.`);
    }
    return sala;
  }

  // Create a new room
  async createSala(data: Sali): Promise<Sali> {
    // Validate if the department exists
    const departmentExists = await this.prisma.departamente.findUnique({
      where: { id_departament: data.id_departament },
    });

    if (!departmentExists) {
      throw new BadRequestException('The specified department does not exist.');
    }

    // Create the room
    return this.prisma.sali.create({
      data,
    });
  }

  // Update an existing room
  async updateSala(id_sala: string, data: Partial<Sali>): Promise<Sali> {
    // Check if the room exists
    const existingSala = await this.prisma.sali.findUnique({ where: { id_sala } });
    if (!existingSala) {
      throw new NotFoundException(`Room with ID ${id_sala} not found.`);
    }

    // Update the room record
    return this.prisma.sali.update({
      where: { id_sala },
      data,
    });
  }

  // Delete a room by ID
  async deleteSala(id_sala: string): Promise<Sali> {
    // Check if the room exists
    const existingSala = await this.prisma.sali.findUnique({ where: { id_sala } });
    if (!existingSala) {
      throw new NotFoundException(`Room with ID ${id_sala} not found.`);
    }

    // Delete the room record
    return this.prisma.sali.delete({
      where: { id_sala },
    });
  }
}
