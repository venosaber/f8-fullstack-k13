import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { ExamReqI } from '@/shares';

//payload / body
export class ExamReq implements ExamReqI {
  @ApiProperty({
    example: 'test name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  exam_group_id: number;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  class_id: number;

  @ApiProperty({
    example: 'abc123',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  number_of_question: number;

  @ApiProperty({
    example: 900,
  })
  @IsNumber()
  @IsNotEmpty()
  total_time: number;

  @ApiProperty({
    example: {},
  })
  @IsObject()
  correct_answer: object;

  @ApiProperty({
    example: 'test description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'desktop',
  })
  @IsString()
  device: string;
}
