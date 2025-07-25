import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { AnswerReqI } from '@/shares';

//payload / body
export class AnswerReq implements AnswerReqI {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  exam_result_id: number;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  question_id: number;

  @ApiProperty({
    example: 'A',
  })
  @IsString()
  answer: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_correct: boolean;
}
