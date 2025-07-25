import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { QuestionReqI } from '@/shares';

//payload / body
export class QuestionReq implements QuestionReqI {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  exam_id: number;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  index: number;

  @ApiProperty({
    example: 'multiple-choice',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'A,C',
  })
  @IsString()
  correct_answer: string;

  @ApiProperty({
    example: 900,
  })
  @IsNumber()
  @IsNotEmpty()
  topic_id: number;
}
