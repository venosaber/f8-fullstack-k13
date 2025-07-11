import { AvataI, StudentReqI, StudentResI } from '../shares';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Avata implements AvataI {
  @ApiProperty({
    example: 1,
    description: 'Avata ID (nullable)',
    required: false,
  })
  @IsOptional() // allow null
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'ID must be a valid number' },
  )
  id: number | null;

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/10000000?v=4',
    description: 'Avata URL (can be empty)',
  })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({
    example: 'payload',
    description: 'Avata payload (can be empty)',
  })
  @IsOptional()
  @IsString()
  payload: string;
}

export class StudentReq implements StudentReqI {
  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'Student name',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'nva@gmail.com',
    description: `Student's email address. Must be unique.`,
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: 'Dang Tran Con',
    description: `Student's school`,
  })
  @IsString()
  @IsOptional() // allow ""
  school: string;

  @ApiProperty({
    example: 'Ngo Thu Quynh',
    description: `Student's parent's name`,
  })
  @IsString()
  @IsOptional() // allow ""
  parent_name: string;

  @ApiProperty({
    example: '0909090909',
    description: `Student's parent's phone number`,
  })
  @IsString()
  @IsOptional() // allow ""
  parent_phone: string;

  @ApiProperty({
    type: Avata,
    description: `Student's avata`,
  })
  @ValidateNested()
  @Type(() => Avata) // convert JSON to Avata Object
  avata: Avata;
}

export class StudentRes implements StudentResI {
  id: number;
  name: string;
  email: string;
  school: string;
  parent_name: string;
  parent_phone: string;
  avata: Avata;
}
