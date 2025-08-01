import { TeacherReqI } from '@/shares';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TeacherReq implements TeacherReqI {
  @ApiProperty({
    example: 'name',
    description: 'full name of the teacher',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email of the teacher',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1a2b3c4d',
    description: 'password of the teacher',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
