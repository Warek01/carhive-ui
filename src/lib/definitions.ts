import type { SvgIconComponent } from '@mui/icons-material';

export interface AppEnv {
  NODE_ENV: 'development' | 'production';
  VITE_API_BASENAME: string;
}

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
