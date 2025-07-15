import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  ValidateIf,
} from 'class-validator';
import { UserReqI } from '@/shares';

//payload / body
export class UserReq implements UserReqI {
  @ApiProperty({
    example: 'test name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'teacher',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    example: 'confirmed',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 1,
    nullable: true,
    required: true,
  })
  @ValidateIf(
    (obj: UserReq) => obj.avatar === null || typeof obj.avatar === 'number',
  )
  @IsNumber()
  avatar: number | null;

  // allow sending empty string ''
  @ApiProperty({
    example: 'test name',
    required: true,
  })
  @IsString()
  parent_name: string;

  // allow sending empty string ''
  @ApiProperty({
    example: '0123456789',
    required: true,
  })
  @IsString()
  parent_phone: string;
}
