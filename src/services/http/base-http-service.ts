import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import qs from 'qs';

import { HttpContextProps } from '@faf-cars/contexts/http';
import { AuthDto } from '@faf-cars/lib/auth';

export abstract class BaseHttpService {
  protected readonly client: AxiosInstance;

  constructor(private readonly ctx: HttpContextProps) {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASENAME,
      timeout: 15_000,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          charset: 'utf-8',
          strictNullHandling: true,
          skipNulls: false,
        }),
    });

    this.client.interceptors.request.use(
      this.requestConfigInterceptor.bind(this),
      this.requestErrorInterceptor.bind(this),
    );

    this.client.interceptors.response.use(
      this.responseSuccessInterceptor.bind(this),
      this.responseErrorInterceptor.bind(this),
    );
  }

  async refresh(): Promise<AuthDto> {
    const response = await axios.post<AuthDto>(
      '/auth/refresh',
      {
        token: this.ctx.accessToken,
        refreshToken: this.ctx.refreshToken,
      },
      { baseURL: import.meta.env.VITE_API_BASENAME },
    );

    return response.data;
  }

  private async responseErrorInterceptor(error: any): Promise<any> {
    if (!(error instanceof AxiosError)) {
      return Promise.reject(error);
    }
    const originalRequest = error.config as InternalAxiosRequestConfig<any> & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      this.ctx.accessToken &&
      this.ctx.refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const result = await this.refresh();
        const token = result.token;
        this.ctx.setAccessToken(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          this.ctx.setAccessToken(null);
          this.ctx.setRefreshToken(null);
          this.ctx.setSessionExpired(true);
        }
      }
    }

    return Promise.reject(error);
  }

  private requestConfigInterceptor(
    config: InternalAxiosRequestConfig<any>,
  ):
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>> {
    if (this.ctx.accessToken) {
      config.headers.set(
        'Authorization',
        `Bearer ${this.ctx.accessToken}`,
        true,
      );
    }

    return config;
  }

  private requestErrorInterceptor(error: any): any {
    return Promise.reject(error);
  }

  private responseSuccessInterceptor(response: AxiosResponse<any, any>): any {
    return response;
  }
}
