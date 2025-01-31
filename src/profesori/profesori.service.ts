/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profesori } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class ProfesoriService {
  constructor(private prisma: PrismaService) {}

  async getAllProfesori(): Promise<Profesori[]> {
    return this.prisma.profesori.findMany();
  }

  async getProfesorById(id_profesor: string): Promise<Profesori | null> {
    const profesor = await this.prisma.profesori.findUnique({ where: { id_profesor } });
    if (!profesor) {
      throw new NotFoundException('Professor not found');
    }
    return profesor;
  }

  async createProfesor(data: Profesori): Promise<Profesori> {
    const departmentExists = await this.prisma.departamente.findUnique({
      where: { idDepartament: data.idDepartament },
    });

    if (!departmentExists) {
      throw new BadRequestException('The specified department does not exist.');
    }

    return this.prisma.profesori.create({
      data,
    });
  }

  async updateProfesor(
    id_profesor: string,
    data: Partial<Profesori>,
  ): Promise<Profesori> {
    const existingProfesor = await this.prisma.profesori.findUnique({
      where: { id_profesor },
    });

    if (!existingProfesor) {
      throw new NotFoundException('Professor not found');
    }

    return this.prisma.profesori.update({
      where: { id_profesor },
      data,
    });
  }

  async deleteProfesor(id_profesor: string): Promise<Profesori> {
    const existingProfesor = await this.prisma.profesori.findUnique({
      where: { id_profesor },
    });

    if (!existingProfesor) {
      throw new NotFoundException('Professor not found');
    }

    return this.prisma.profesori.delete({ where: { id_profesor } });
  }

  async populateProfesori(): Promise<string> {
    const url = 'https://orar.usv.ro/orar/vizualizare/data/cadre.php?json';
  
    try {
      const response = await axios.get(url);
      const data = response.data;
  
      // First, fetch all departments to reduce database queries
      const departments = await this.prisma.departamente.findMany();
  
      for (const item of data) {
        const { id, lastName, firstName, facultyName,departmentName } = item;
  
        if (!id || !lastName || !firstName) continue;
  
        // Find the department that matches the faculty name
        const department = departments.find(dep => 
          dep.longName === facultyName || 
          dep.shortName === facultyName
        );
  
        // If no matching department is found, skip this professor
        if (!department) {
          console.warn(`No department found for: ${facultyName || 'Unknown'}`);
          continue;
        }
  
        await this.prisma.profesori.upsert({
          where: { id_profesor: id },
          update: {
            lastName: lastName.trim(),
            firstName: firstName.trim(),
            emailAddress: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            idDepartament: department.idDepartament,
            facultyName: facultyName || null, // Add facultyName, use null if not provided
            departmentName: departmentName || null, // Add facultyName, use null if not provided
       
          },
          create: {
            id_profesor: id,
            lastName: lastName.trim(),
            firstName: firstName.trim(),
            emailAddress: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            idDepartament: department.idDepartament,
            facultyName: facultyName || null, // Add facultyName, use null if not provided
            departmentName: departmentName || null, // Add facultyName, use null if not provided
       
          },
        })
      }
  
      return 'Profesori table populated successfully.';
    } catch (error) {
      console.error('Error populating Profesori table:', error);
      throw new Error('Failed to populate Profesori table.');
    }
  }
}
