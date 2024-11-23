/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Grupe } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class GrupeService {
  constructor(private prisma: PrismaService) {}

  async getAllGrupe(): Promise<Grupe[]> {
    return this.prisma.grupe.findMany();
  }

  async getGrupeById(id: string): Promise<Grupe | null> {
    const grupe = await this.prisma.grupe.findUnique({
      where: { id },
    });

    if (!grupe) {
      throw new NotFoundException(`Grupe with ID ${id} not found.`);
    }

    return grupe;
  }

  async createGrupe(data: Omit<Grupe, 'id'>): Promise<Grupe> {
    return this.prisma.grupe.create({
      data,
    });
  }

  async updateGrupe(id: string, data: Partial<Grupe>): Promise<Grupe> {
    const existingGrupe = await this.prisma.grupe.findUnique({
      where: { id },
    });

    if (!existingGrupe) {
      throw new NotFoundException(`Grupe with ID ${id} not found.`);
    }

    return this.prisma.grupe.update({
      where: { id },
      data,
    });
  }

  async deleteGrupe(id: string): Promise<Grupe> {
    const existingGrupe = await this.prisma.grupe.findUnique({
      where: { id },
    });

    if (!existingGrupe) {
      throw new NotFoundException(`Grupe with ID ${id} not found.`);
    }

    return this.prisma.grupe.delete({
      where: { id },
    });
  }

  async populateGrupe(): Promise<string> {
    const url = 'https://orar.usv.ro/orar/vizualizare/data/subgrupe.php?json';
  
    try {
      const response = await axios.get(url);
      const data = response.data;
  
      for (const item of data) {
        const {
          id,
          type,
          facultyId,
          specializationShortName,
          studyYear,
          groupName,
          subgroupIndex,
          isModular,
          orarId,
        } = item;
  
        // Skip invalid records
        if (!id || !type || !facultyId || !specializationShortName || !studyYear || !orarId) {
          console.warn('Skipping invalid record:', item);
          continue;
        }
  
        // Sanitize data to match Prisma schema
        const sanitizedData = {
          id: id.toString(),
          type: type.toString(),
          facultyId: facultyId.toString(),
          specializationShortName: specializationShortName.toString(),
          studyYear: studyYear.toString(),
          groupName: groupName && groupName !== '_' ? groupName.toString() : null,
          subgroupIndex: subgroupIndex ? subgroupIndex.toString() : null,
          isModular: isModular.toString(),
          orarId: orarId.toString(),
        };
  
        // Debug: log sanitized data
        console.log('Processing record:', sanitizedData);
  
        // Insert or update the record in the database
        await this.prisma.grupe.upsert({
          where: { id: sanitizedData.id },
          update: sanitizedData,
          create: sanitizedData,
        });
      }
  
      return 'Grupe table populated successfully.';
    } catch (error) {
      console.error('Error populating Grupe table:', error);
      throw new Error('Failed to populate Grupe table.');
    }
  }
  
  
}
