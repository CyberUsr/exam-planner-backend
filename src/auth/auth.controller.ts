import { Controller, Post, Body, UseGuards, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth') // Swagger group for authentication-related endpoints
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @ApiOperation({ summary: 'Login and obtain a JWT' })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @ApiBearerAuth() // Indicates that this endpoint requires a JWT token
  @ApiOperation({ summary: 'Access a protected route' })
  @ApiResponse({ status: 200, description: 'Accessed protected route.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return { message: 'This is a protected route' };
  }
}
