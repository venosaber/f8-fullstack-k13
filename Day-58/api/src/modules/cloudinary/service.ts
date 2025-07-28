import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // automatically detect the file type
        (error, result) => {
          if (error) {
            return reject(new Error(JSON.stringify(error)));
          }
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Cloudinary did not return a result.'));
          }
        },
      );
      upload.end(file.buffer);
    });
  }
}
