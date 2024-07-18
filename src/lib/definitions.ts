import { SvgIconComponent } from '@mui/icons-material';

export interface IconButton<T> {
  Icon: SvgIconComponent;
  text: string;
  value: T;
}
