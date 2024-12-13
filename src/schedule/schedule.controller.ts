/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all schedules' })
  @ApiResponse({ status: 200, description: 'Return all schedules.' })
  async getAllSchedules(): Promise<Schedule[]> {
    return this.scheduleService.getAllSchedules();
  }

  @Get('group/:id')
  @ApiOperation({ summary: 'Get schedules for a specific group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Return schedules for the group.' })
  async getSchedulesForGroup(
    @Param('id') groupId: string,
  ): Promise<Schedule[]> {
    return this.scheduleService.getSchedulesForGroup(groupId);
  }

  @Get('teacher/:id')
  @ApiOperation({ summary: 'Get schedules for a specific teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiResponse({
    status: 200,
    description: 'Return schedules for the teacher.',
  })
  async getSchedulesForTeacher(
    @Param('id') teacherId: string,
  ): Promise<Schedule[]> {
    return this.scheduleService.getSchedulesForTeacher(teacherId);
  }

  @Post('populate')
  @ApiOperation({
    summary: 'Populate schedules for all groups from an external API',
  })
  @ApiResponse({
    status: 200,
    description: 'Schedules populated successfully for all groups.',
  })
  async populateSchedules(): Promise<string> {
    return this.scheduleService.populateSchedules();
  }
}
