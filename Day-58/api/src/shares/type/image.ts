export interface ImageBaseI {
  public_id: string;
  url: string;
  original_name: string;
  file_type: string;
  size: number;
}

export interface ImageI extends ImageBaseI {
  id: number;
  created_at: Date;
  is_deleted: boolean;
  deleted_at: Date | null;
}

export type ImageReqI = ImageBaseI;
export type ImageResI = ImageI;
