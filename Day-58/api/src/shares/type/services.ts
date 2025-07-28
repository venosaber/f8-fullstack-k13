import { ImageReqI, ImageI } from './image';
export interface BaseServiceI<RequestI, ResponseI> {
  find: (params?: any) => Promise<ResponseI[]>;
  findOne: (id: number) => Promise<ResponseI | undefined>;
  create: (data: RequestI) => Promise<ResponseI>;
  softDelete: (id: number) => Promise<{ msg: string }>;
}

export type ImageServiceI = BaseServiceI<ImageReqI, ImageI>;
