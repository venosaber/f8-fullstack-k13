import { ImageReqI, ImageResI } from '@/shares';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateImageDto implements ImageReqI {
  @ApiProperty({
    description: 'ID of the file on Cloudinary',
    example: 'file_123',
  })
  @IsString()
  @IsNotEmpty()
  public_id: string;

  @ApiProperty({
    description: 'URL of the file on Cloudinary',
    example: 'https://res.cloudinary.com/...',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Original name of the file when uploaded',
    example: 'file.jpg',
  })
  @IsString()
  @IsNotEmpty()
  original_name: string;

  @ApiProperty({
    description: 'Image type of the file when uploaded',
    example: 'image/jpeg',
  })
  @IsString()
  @IsNotEmpty()
  file_type: string;

  @ApiProperty({
    description: 'Size of the file when uploaded',
    example: 1234567890,
  })
  @IsNumber()
  @IsNotEmpty()
  size: number;
}

export class UpdateImageDto implements Partial<ImageReqI> {
  @ApiProperty({
    description: 'ID of the file on Cloudinary',
    example: 'file_123',
    required: false,
  })
  @IsString()
  @IsOptional()
  public_id?: string;

  @ApiProperty({
    description: 'URL of the file on Cloudinary',
    example: 'https://res.cloudinary.com/...',
    required: false,
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Original name of the file when uploaded',
    example: 'file.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  original_name?: string;

  @ApiProperty({
    description: 'Image type of the file when uploaded',
    example: 'image/jpeg',
    required: false,
  })
  @IsString()
  @IsOptional()
  file_type?: string;

  @ApiProperty({
    description: 'Size of the file when uploaded',
    example: 1234567890,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  size?: number;
}

export class ImageResponseDto implements ImageResI {
  @ApiProperty({
    description: 'ID of the image in the database',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'ID of the file on Cloudinary',
    example: 'file_123',
  })
  @IsString()
  @IsNotEmpty()
  public_id: string;

  @ApiProperty({
    description: 'URL of the file on Cloudinary',
    example: 'https://res.cloudinary.com/...',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Original name of the file when uploaded',
    example: 'file.jpg',
  })
  @IsString()
  @IsNotEmpty()
  original_name: string;

  @ApiProperty({
    description: 'Image type of the file when uploaded',
    example: 'image/jpeg',
  })
  @IsString()
  @IsNotEmpty()
  file_type: string;

  @ApiProperty({
    description: 'Size of the file when uploaded',
    example: 1234567890,
  })
  @IsNumber()
  @IsNotEmpty()
  size: number;

  @ApiProperty({
    description: 'Date when the image was created',
    example: '2021-09-01T00:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    description: 'Whether the image is deleted or not',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_deleted: boolean;

  @ApiProperty({
    description: 'Date when the image was deleted',
    example: '2021-09-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  deleted_at: Date | null;
}
