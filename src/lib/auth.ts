import { JwtPayload } from 'jwt-decode';

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}

export interface AuthDto {
  token: string;
  refreshToken: string;
}

export interface AppJwtPayload extends JwtPayload {
  role: string[];
}
