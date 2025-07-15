import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { FileReqI } from '@/shares';

//payload / body
export class FileReq implements FileReqI {
  @ApiProperty({
    example: 'url',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: 'key',
  })
  @IsString()
  @IsNotEmpty()
  key: string;
}
