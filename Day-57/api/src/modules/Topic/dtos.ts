import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { TopicReqI } from '@/shares';

//payload / body
export class TopicReq implements TopicReqI {
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
  subject_id: number;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
