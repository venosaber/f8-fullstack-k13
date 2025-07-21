interface FileBaseI {
  url: string;
  key: string;
}

export interface FileI extends FileBaseI {
  id: number;
}

export type FileReqI = FileBaseI;

export type FileResI = FileI;
