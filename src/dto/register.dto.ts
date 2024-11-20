import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Your email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Your password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
