import { ClassReqI, ClassResI } from '../shares';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class ClassReq implements ClassReqI {
  @ApiProperty({
    example: 'Class 1',
    description: 'Class name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A001',
    description: 'Class code',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'List of user IDs associated with the class',
  })
  @IsArray()
  @ArrayUnique() // The members of the array are unique
  @IsInt({ each: true }) // Each member of the array must be an integer
  @Min(1, { each: true }) // Each member of the array must be greater than or equal to 1
  users: number[];
}

export class ClassRes implements ClassResI {
  id: number;
  name: string;
  code: string;
  users: number[];
}
