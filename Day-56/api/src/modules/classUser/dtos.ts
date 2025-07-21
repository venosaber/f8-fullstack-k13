import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ClassUserReqI } from '@/shares';

//payload / body
export class ClassUserReq implements ClassUserReqI {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  classId: number;
}
