/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Schedule, Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all schedules
  async getAllSchedules(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      include: {
        Materii: true,
        Grupe: true,
        Profesori: true,
      },
    });
  }

  // Fetch schedules for a specific group
  async getSchedulesForGroup(groupId: string): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      where: { groupId },
      include: {
        Materii: true,
        Grupe: true,
        Profesori: true,
      },
    });
  }
  async getSchedulesForTeacher(teacherId: string): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      where: { teacherId },
      include: {
        Materii: true,
        Grupe: true,
        Profesori: true,
      },
    });
  }
  // Populate schedules for all groups
  async populateSchedules(): Promise<string> {
    try {
      const groups = await this.prisma.grupe.findMany();

      if (!groups.length) {
        throw new InternalServerErrorException(
          'No groups found in the database.',
        );
      }

      for (const group of groups) {
        const endpointUrl = `https://orar.usv.ro/orar/vizualizare/data/orarSPG.php?ID=${group.id}&mod=grupa&json`;

        try {
          const { data } = await axios.get(endpointUrl);

          if (!Array.isArray(data[0])) {
            console.warn(
              `Invalid schedule data for group ${group.id}. Skipping.`,
            );
            continue;
          }

          for (const item of data[0]) {
            const {
              id,
              typeShortName,
              teacherID,
              roomId,
              roomBuilding,
              roomShortName,
              weekDay,
              startHour,
              duration,
              parity,
              topicLongName,
            } = item;

            if (!id || !typeShortName || !teacherID || !topicLongName) {
              console.warn('Skipping invalid schedule item:', item);
              continue;
            }

            // Find Materii and Profesori
            const existingMaterie = await this.prisma.materii.findFirst({
              where: { nume_materie: topicLongName },
            });

            const existingTeacher = await this.prisma.profesori.findUnique({
              where: { id_profesor: teacherID },
            });

            if (!existingTeacher) {
              console.warn(`Teacher with ID ${teacherID} not found. Skipping.`);
              continue;
            }

            // Prepare schedule data
            const scheduleData: Prisma.ScheduleCreateInput = {
              id,
              type: typeShortName,
              roomId,
              roomBuilding,
              roomName: roomShortName,
              weekDay: parseInt(weekDay, 10),
              startHour: parseInt(startHour, 10),
              duration: parseInt(duration, 10),
              parity,
              otherInfo: item.otherInfo || null,
              Grupe: { connect: { id: group.id } },
              Materii: existingMaterie
                ? { connect: { id_materie: existingMaterie.id_materie } }
                : undefined,
              Profesori: { connect: { id_profesor: teacherID } },
            };

            // Upsert schedule
            await this.prisma.schedule.upsert({
              where: { id },
              update: scheduleData,
              create: scheduleData,
            });
          }
        } catch (error) {
          console.error(
            `Failed to fetch or process schedule for group ${group.id}:`,
            error.message,
          );
        }
      }

      return 'Schedules populated successfully for all groups.';
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to populate schedules: ${error.message}`,
      );
    }
  }
}
