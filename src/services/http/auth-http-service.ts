import { AuthDto, LoginDto, RegisterDto } from '@faf-cars/lib/auth';
import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

export class AuthHttpService extends BaseHttpService {
  async login(loginDto: LoginDto, params?: object): Promise<AuthDto> {
    const res = await this.client.post<AuthDto>('auth/login', loginDto, {
      params,
    });
    return res.data;
  }

  async register(registerDto: RegisterDto, params?: object): Promise<AuthDto> {
    const res = await this.client.post<AuthDto>('auth/register', registerDto, {
      params,
    });
    return res.data;
  }

  async googleLogin(token: string) {
    const res = await this.client.post('auth/google-login', { token });
    return res.data;
  }

  async googleRegister(token: string) {
    const res = await this.client.post('auth/google-register', { token });
    return res.data;
  }
}
