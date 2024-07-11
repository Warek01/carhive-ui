import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import qs from 'qs';

import { HttpContextProps } from '@faf-cars/context/http.context';
import { AuthDto, LoginDto, RegisterDto } from '@faf-cars/lib/auth';
import { FavoriteListingAction, ListingDto } from '@faf-cars/lib/listings';
import { PaginatedResponse } from '@faf-cars/lib/pagination';
import {
  MarketStatistics,
  MarketStatisticsQuery,
} from '@faf-cars/lib/statistics';
import { CreateUserDto, UpdateUserDto, User } from '@faf-cars/lib/user';

export class HttpService {
  private readonly client: AxiosInstance;

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

  async getListings(params?: object): Promise<PaginatedResponse<ListingDto>> {
    const { data } = await this.client.get<PaginatedResponse<ListingDto>>(
      'listing',
      {
        params,
      },
    );

    return data;
  }

  async getListingDetails(
    listingId: string,
    params?: object,
  ): Promise<ListingDto> {
    const { data } = await this.client.get<ListingDto>(`listing/${listingId}`, {
      params,
    });

    return data;
  }

  async mutateFavoriteListings(
    action: FavoriteListingAction,
    params?: object,
  ): Promise<void> {
    const { data } = await this.client.post<void>('listing/favorites', action, {
      params,
    });

    return data;
  }

  async createListing(formData: FormData, params?: object): Promise<void> {
    await this.client.post<void>('listing', formData, {
      params,
    });
  }

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

  async getUser(userId: string, params?: object): Promise<User> {
    const res = await this.client.get<User>('user/' + userId, {
      params,
    });
    return res.data;
  }

  async getUsers(params?: object): Promise<PaginatedResponse<User>> {
    const res = await this.client.get<PaginatedResponse<User>>('user', {
      params,
    });
    return res.data;
  }

  async updateUser(
    userId: string,
    updateDto: UpdateUserDto,
    params?: object,
  ): Promise<PaginatedResponse<User>> {
    const res = await this.client.patch<PaginatedResponse<User>>(
      `user/${userId}`,
      updateDto,
      { params },
    );
    return res.data;
  }

  async deleteUser(userId: string, params?: object): Promise<void> {
    const res = await this.client.delete<void>(`user/${userId}`, {
      params,
    });
    return res.data;
  }

  async createUser(createDto: CreateUserDto, params?: object): Promise<void> {
    const res = await this.client.post<void>('user', createDto, {
      params,
    });
    return res.data;
  }

  async getListingsStats(
    params: MarketStatisticsQuery,
    additionalParams?: object,
  ): Promise<MarketStatistics> {
    const res = await this.client.get<MarketStatistics>('statistics/market', {
      params: {
        ...params,
        ...additionalParams,
      },
    });
    return res.data;
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
        console.error(error);
        if (error instanceof AxiosError && error.response?.status === 401) {
          this.ctx.setAccessToken(null);
          this.ctx.setRefreshToken(null);
          this.ctx.setSessionExpired(true);
        }
      }
    }

    return Promise.reject(error);
  }
}
