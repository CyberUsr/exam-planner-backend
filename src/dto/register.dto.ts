import { IsEmail, IsNotEmpty, MinLength ,IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    example: 'user@usm.ro', 
    description: 'Your email address. Professors should use emails ending with @usm.ro.' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Your password. Must be at least 6 characters long.', 
    minLength: 6 
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  
  @ApiProperty({ 
    example: true, 
    description: 'Indicates if the user is a professor. This field is derived from the email domain.' 
  })
  @IsBoolean()
  @IsOptional()
  isProfesor?: boolean;
}
