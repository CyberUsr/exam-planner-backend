/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Materii } from '@prisma/client'; // Import Materii type
import axios from 'axios';

@Injectable()
export class MateriiService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all subjects
  async getAllMaterii(): Promise<Materii[]> {
    return this.prisma.materii.findMany({
      include: {
        professors: true,
        assistants: true,
        grupa: true,
        examene: true,
      },
    });
  }

  // Fetch subjects for a specific teacher
  async getMateriiForTeacher(teacherId: string): Promise<Materii[]> {
    return this.prisma.materii.findMany({
      where: {
        professors: {
          some: { id_profesor: teacherId },
        },
      },
      include: {
        professors: true,
        assistants: true,
        grupa: true,
        examene: true,
      },
    });
  }

  async importMateriiFromEndpoint(): Promise<void> {
    try {
      // Fetch all professors from the database
      const professors = await this.prisma.profesori.findMany();

      if (!professors || professors.length === 0) {
        console.log('No professors found in the database.');
        return;
      }

      for (const professor of professors) {
        console.log(`Fetching data for professor: ${professor.id_profesor}`);
        const url = `https://orar.usv.ro/orar/vizualizare/data/orarSPG.php?ID=${professor.id_profesor}&mod=prof&json`;

        try {
          // Fetch data for the professor
          const { data } = await axios.get(url);

          if (Array.isArray(data) && data[0]) {
            for (const subject of data[0]) {
              const {
                id,
                topicLongName,
                topicShortName,
                specializationShortName,
              } = subject;

              if (!id || !topicLongName) {
                console.log('Invalid subject data:', subject);
                continue;
              }

              // Upsert subject data into the database
              await this.prisma.materii.upsert({
                where: { id_materie: id },
                create: {
                  id_materie: id,
                  nume_materie: topicLongName,
                  specializationShortName:
                    specializationShortName || topicShortName || null,
                  professors: {
                    connect: { id_profesor: professor.id_profesor },
                  },
                },
                update: {
                  nume_materie: topicLongName,
                  specializationShortName:
                    specializationShortName || topicShortName || null,
                },
              });

              console.log(
                `Imported/Updated subject: ${topicLongName} (ID: ${id})`,
              );
            }
          } else {
            console.log(
              `No subjects found for professor ID: ${professor.id_profesor}`,
            );
          }
        } catch (error) {
          console.error(
            `Error fetching data for professor ID: ${professor.id_profesor}`,
            error.message,
          );
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to import Materii: ${error.message}`,
      );
    }
  }
  async findMaterieById(id_materie: string) {
    // Log all existing subject IDs for comparison
    const allSubjects = await this.prisma.materii.findMany({
      select: { id_materie: true, nume_materie: true }
    });
    console.log('All subject IDs:', allSubjects);
  
    const materie = await this.prisma.materii.findUnique({
      where: { id_materie },
    });
  
    if (!materie) {
      throw new NotFoundException(`No subject found with ID "${id_materie}"`);
    }
  
    return materie;
  }
  
}
