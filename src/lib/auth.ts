import type { JwtPayload } from 'jwt-decode'

export interface LoginDto {
  username: string
  password: string
}

export interface RegisterDto {
  username: string
  password: string
  email: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  password: string
  repeatPassword: string
  email: string
}

export interface JwtResponse {
  token: string
}

export interface AppJwtPayload extends JwtPayload {
  nameid?: string
  sub?: string
  name: string
  email: string
  role?: string | string[]
}
