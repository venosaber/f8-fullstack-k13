import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { SubjectReqI } from '@/shares';

//payload / body
export class SubjectReq implements SubjectReqI {
  @ApiProperty({
    example: 'test name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'abc123',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
