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

  async updateProfesor(
    id_profesor: string,
    data: Partial<Profesori>,
  ): Promise<Profesori> {
    return this.prisma.profesori.update({
      where: { id_profesor },
      data,
    });
  }

  async deleteProfesor(id_profesor: string): Promise<Profesori> {
    return this.prisma.profesori.delete({ where: { id_profesor } });
  }

  async populateProfesori(): Promise<string> {
    const url = 'https://orar.usv.ro/orar/vizualizare/data/cadre.php?json';
    const defaultDepartmentId = 'default-dep'; // Default department ID
    const defaultFacultyName = 'Default Faculty'; // Default faculty name

    try {
      // Fetch data from the external URL
      const response = await axios.get(url);
      const data = response.data;

      // Iterate over the fetched data and populate the Profesori table
      for (const item of data) {
        const { id, lastName, firstName, facultyName } = item;

        // Skip invalid records
        if (!id || !lastName || !firstName) {
          continue;
        }

        // Use facultyName or assign default
        const faculty = facultyName || defaultFacultyName;
        const departmentId = faculty.replace(/\s+/g, '-').toLowerCase(); // Generate a unique ID for each faculty

        // Ensure the department exists
        let department = await this.prisma.departamente.findUnique({
          where: { id_departament: departmentId },
        });

        if (!department) {
          department = await this.prisma.departamente.create({
            data: {
              id_departament: departmentId,
              nume_departament: faculty, // Use faculty name as department name
            },
          });
        }

        // Create or update the professor record
        await this.prisma.profesori.upsert({
          where: { id_profesor: id },
          update: {
            nume: lastName.trim(),
            prenume: firstName.trim(),
            email: `${firstName.trim().toLowerCase()}.${lastName.trim().toLowerCase()}@example.com`, // Example email
            specializare: 'General', // Default specialization
            id_departament: department.id_departament, // Link to the department
          },
          create: {
            id_profesor: id,
            nume: lastName.trim(),
            prenume: firstName.trim(),
            email: `${firstName.trim().toLowerCase()}.${lastName.trim().toLowerCase()}@example.com`, // Example email
            specializare: 'General', // Default specialization
            id_departament: department.id_departament, // Link to the department
          },
        });
      }

      return 'Profesori table populated successfully.';
    } catch (error) {
      console.error('Error populating Profesori table:', error);
      throw new Error('Failed to populate Profesori table.');
    }
  }
}
