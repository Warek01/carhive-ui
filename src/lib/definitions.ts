import { SvgIconComponent } from '@mui/icons-material';

export interface FileDto {
  fileName?: string;
  base64Body: string;
}

export interface ImageFile {
  file: File;
  body: string;
}

export interface IconButton<T> {
  Icon: SvgIconComponent;
  text: string;
  value: T;
}
