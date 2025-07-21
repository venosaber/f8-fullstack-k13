import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { ExamResultReqI } from '@/shares';

//payload / body
export class ExamResultReq implements ExamResultReqI {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  exam_id: number;

  @ApiProperty({
    example: 'doing',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: {},
  })
  @IsObject()
  answers: object;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  number_of_correct_answer: number;

  @ApiProperty({
    example: 9,
  })
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
