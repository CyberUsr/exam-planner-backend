import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'user@usm.ro', 
    description: 'Your email address' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Your password for logging in.' 
  })
  @IsNotEmpty()
  password: string;
}
