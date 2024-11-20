import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Your email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Your password' })
  @IsNotEmpty()
  password: string;
}
