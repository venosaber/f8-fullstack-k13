import {
  Controller,
  Inject,
  Post,
  Get,
  Delete,
  UseInterceptors,
  Param,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ImageServiceToken, ImageServiceI } from '@/shares';
import { CreateImageDto, ImageResponseDto } from './dtos';
import { CloudinaryService } from '@/modules/cloudinary/service';
import { UploadApiResponse } from 'cloudinary';

@ApiTags('Images')
@Controller('/images')
export class ImageController {
  constructor(
    @Inject(ImageServiceToken)
    private readonly imageService: ImageServiceI,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile(
      // use Pipe to validate the file
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ImageResponseDto> {
    // upload the file to Cloudinary
    const cloudinaryResponse: UploadApiResponse =
      await this.cloudinaryService.uploadFile(file);

    // from the result Cloudinary returns, create DTO to save into DB
    const createImageDto: CreateImageDto = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
      original_name: file.originalname,
      file_type: cloudinaryResponse.format,
      size: cloudinaryResponse.bytes,
    };

    // use ImageService to save info into DB
    return this.imageService.create(createImageDto);
  }

  // get all images that are not soft-deleted
  @Get()
  async getAll() {
    return this.imageService.find();
  }

  // get an image which is not soft-deleted by id
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.imageService.findOne(id);
  }

  // soft delete the image (only update is_deleted to true)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.imageService.softDelete(id);
  }
}
