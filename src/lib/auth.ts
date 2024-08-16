import { GoogleLoginProps } from '@react-oauth/google';
import { JwtPayload } from 'jwt-decode';

export const enum OauthIdentityProvider {
  Google,
}

export interface OauthRegisterDto {
  token: string;
}

export interface OauthLoginDto {
  token: string;
}

export interface LoginDto {
  username?: string;
  password?: string;
}

export interface LoginFormData {
  username?: string;
  password?: string;
}

export interface RegisterDto {
  username?: string;
  password?: string;
  email?: string;
}

export interface RegisterFormData {
  username?: string;
  password?: string;
  repeatPassword?: string;
  email?: string;
}

export interface AuthDto {
  token: string;
  refreshToken: string;
}

export interface AppJwtPayload extends JwtPayload {
  role: string[];
}

export const GOOGLE_LOGIN_PROPS: GoogleLoginProps = {
  ux_mode: 'popup',
  theme: 'filled_black',
  width: '2000px',
  shape: 'rectangular',
  size: 'large',
  type: 'standard',
  useOneTap: true,
  cancel_on_tap_outside: true,
  onSuccess() {
    throw new Error('onSuccess is not defined');
  },
};
