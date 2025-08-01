import { StudentReqI } from '@/shares';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StudentReq implements StudentReqI {
  @ApiProperty({
    example: 'name',
    description: 'full name of the student',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email of the student',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1a2b3c4d',
    description: 'password of the student',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
