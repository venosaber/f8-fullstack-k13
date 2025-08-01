import { ApiProperty } from '@nestjs/swagger';
import { LoginReqI, RegisterReqI, Role } from '@/shares';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class LoginReq implements LoginReqI {
  @ApiProperty({
    description: 'email of the user',
    example: 'test@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    example: '1a2b3c4d',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterReq implements RegisterReqI {
  @ApiProperty({
    description: 'full name of the user',
    example: 'Trinh Van Quyet',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'role of the user',
    example: Role.STUDENT,
    enum: Role,
  })
  @IsEnum(Role, { message: 'role must be one of: admin, teacher, student' })
  @IsNotEmpty()
  role: Role;

  @ApiProperty({
    description: 'email of the user',
    example: 'test@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    example: '1a2b3c4d',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
