/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const profesor = await this.prisma.profesori.findUnique({
      where: { id_profesor },
    });
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
        const {
          id,
          lastName,
          firstName,
          emailAddress,
          facultyName,
          departmentName,
        } = item;

        if (!id || !lastName || !firstName || !emailAddress) continue;

        // Find the department that matches the faculty name
        const department = departments.find(
          (dep) =>
            dep.longName === facultyName || dep.shortName === facultyName,
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
            emailAddress: emailAddress.trim(), // Use emailAddress from API
            idDepartament: department.idDepartament,
            facultyName: facultyName || null,
            departmentName: departmentName || null,
          },
          create: {
            id_profesor: id,
            lastName: lastName.trim(),
            firstName: firstName.trim(),
            emailAddress: emailAddress.trim(), // Use emailAddress from API
            idDepartament: department.idDepartament,
            facultyName: facultyName || null,
            departmentName: departmentName || null,
          },
        });
      }

      return 'Profesori table populated successfully.';
    } catch (error) {
      console.error('Error populating Profesori table:', error);
      throw new Error('Failed to populate Profesori table.');
    }
  }

  async populateProfesoriByFaculty(facultyName: string): Promise<string> {
    const url = 'https://orar.usv.ro/orar/vizualizare/data/cadre.php?json';

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Fetch all departments once to optimize lookups
      const departments = await this.prisma.departamente.findMany();

      for (const item of data) {
        const {
          id,
          lastName,
          firstName,
          emailAddress,
          facultyName: itemFacultyName,
          departmentName,
        } = item;

        // Skip if the teacher's faculty does not match the given faculty name
        if (itemFacultyName !== facultyName) continue;

        if (!id || !lastName || !firstName || !emailAddress) continue;

        // Find the corresponding department
        const department = departments.find(
          (dep) =>
            dep.longName === itemFacultyName ||
            dep.shortName === itemFacultyName,
        );

        // If no matching department is found, skip this professor
        if (!department) {
          console.warn(
            `No department found for: ${itemFacultyName || 'Unknown'}`,
          );
          continue;
        }

        await this.prisma.profesori.upsert({
          where: { id_profesor: id },
          update: {
            lastName: lastName.trim(),
            firstName: firstName.trim(),
            emailAddress: emailAddress.trim(), // Use emailAddress from API
            idDepartament: department.idDepartament,
            facultyName: itemFacultyName || null,
            departmentName: departmentName || null,
          },
          create: {
            id_profesor: id,
            lastName: lastName.trim(),
            firstName: firstName.trim(),
            emailAddress: emailAddress.trim(), // Use emailAddress from API
            idDepartament: department.idDepartament,
            facultyName: itemFacultyName || null,
            departmentName: departmentName || null,
          },
        });

        console.log(
          `Imported/Updated professor: ${firstName} ${lastName} (ID: ${id})`,
        );
      }

      return `Professors from faculty "${facultyName}" imported successfully.`;
    } catch (error) {
      console.error('Error populating Professors:', error);
      throw new Error('Failed to populate Professors.');
    }
  }
}
