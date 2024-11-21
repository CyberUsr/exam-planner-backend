/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Sali } from '@prisma/client';
import axios from 'axios';

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
  async createSala(data: Omit<Sali, 'id_sala'>): Promise<Sali> {
    // The department check is removed since it is no longer mandatory
    // Create the room
    return this.prisma.sali.create({
      data,
    });
  }

  // Update an existing room
  async updateSala(
    id_sala: string,
    data: Partial<Omit<Sali, 'id_sala'>>,
  ): Promise<Sali> {
    // Check if the room exists
    const existingSala = await this.prisma.sali.findUnique({
      where: { id_sala },
    });
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
    const existingSala = await this.prisma.sali.findUnique({
      where: { id_sala },
    });
    if (!existingSala) {
      throw new NotFoundException(`Room with ID ${id_sala} not found.`);
    }

    // Delete the room record
    return this.prisma.sali.delete({
      where: { id_sala },
    });
  }

  // Populate the Sali table
  async populateSali(): Promise<string> {
    const url = 'https://orar.usv.ro/orar/vizualizare/data/sali.php?json';

    try {
      // Fetch data from the external API
      const response = await axios.get(url);
      const data = response.data;

      // Log the response for debugging
      console.log('Fetched Data:', data);

      // Iterate over the data and populate the table
      for (const item of data) {
        const { id, name, shortName, buildingName } = item;

        // Validate required fields
        if (!id || !name || !shortName || !buildingName) {
          console.warn('Skipping invalid record:', item);
          continue;
        }

        // Upsert the room record
        await this.prisma.sali.upsert({
          where: { id_sala: id.toString() },
          update: {
            nume: name.trim(),
            shortName: shortName.trim(),
            buildingName: buildingName.trim(),
          },
          create: {
            id_sala: id.toString(),
            nume: name.trim(),
            shortName: shortName.trim(),
            buildingName: buildingName.trim(),
          },
        });
      }

      return 'Sali table populated successfully.';
    } catch (error) {
      console.error('Error populating Sali table:', error.message, error.stack);
      throw new Error('Failed to populate Sali table.');
    }
  }
  async getSaliByBuilding(buildingName: string): Promise<Sali[]> {
    return this.prisma.sali.findMany({
      where: { buildingName },
    });
  }
}
