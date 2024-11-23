import { IsEmail, IsNotEmpty ,IsBoolean, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'user@usm.ro', 
    description: 'Your email address. Professors should use emails ending with @usm.ro.' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Your password for logging in.' 
  })
  @IsNotEmpty()
  password: string;


  @ApiProperty({ 
    example: true, 
    description: 'Indicates if the user is a professor. This field is derived from the email domain.' 
  })
  @IsBoolean()
  @IsOptional()
  isProfesor?: boolean;
}
