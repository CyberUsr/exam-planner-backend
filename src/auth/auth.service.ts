/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client'; // Import the generated Role enum

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Automatically determine the role based on the email domain
    let role: Role = Role.Student; // Default role
    if (email.endsWith('@usm.ro')) {
      role = Role.Profesor;
    } else if (email.endsWith('@secretariat.usm.ro')) {
      role = Role.Secretariat;
    } else if (email.endsWith('@admin.usm.ro')) {
      role = Role.Admin; // Special case for admin
    }

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, role },
    });

    return { message: 'User registered successfully!', user };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      role: user.role, // Include role in the token payload
    });

    return {
      message: 'Logged in successfully!',
      token,
      user: { email: user.email, role: user.role }, // Return role for client awareness
    };
  }
}
