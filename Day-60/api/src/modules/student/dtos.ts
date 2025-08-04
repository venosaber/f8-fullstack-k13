import { StudentReqI } from '@/shares';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({
    example: 'confirmed',
    description: 'status of the account',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 1,
    description: 'file id of avatar of the student, can leave empty',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  avatar: number | null;

  @ApiProperty({
    example: 'parent name',
    description: 'full name of the parent',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  parent_name: string | null;

  @ApiProperty({
    example: '0901234567',
    description: 'phone number of the parent',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  parent_phone: string | null;
}
