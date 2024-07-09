import type { JwtPayload } from 'jwt-decode';

import type { UserRole } from '@faf-cars/lib/user';

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  username: string;
  roles: UserRole[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}

export interface JwtResponse {
  token: string;
  refreshToken: string;
}

export interface AppJwtPayload extends JwtPayload {
  role?: string | string[];
}
