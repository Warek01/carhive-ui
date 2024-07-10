import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import { AuthDto, LoginDto, RegisterDto } from '@faf-cars/lib/auth';
import { FavoriteListingAction, ListingDto } from '@faf-cars/lib/listings';
import { PaginatedResponse } from '@faf-cars/lib/pagination';
import {
  MarketStatistics,
  MarketStatisticsQuery,
} from '@faf-cars/lib/statistics';
import { CreateUserDto, UpdateUserDto, User } from '@faf-cars/lib/user';

export class HttpService {
  private readonly _axiosInstance: AxiosInstance;

  constructor(token: string | null) {
    const headers: HeadersInit = {};

    if (token !== null) {
      headers.Authorization = `Bearer ${token}`;
    }

    this._axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASENAME,
      timeout: 15_000,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          charset: 'utf-8',
          strictNullHandling: true,
          skipNulls: false,
        }),
      headers,
    });
  }

  async getListings(params?: object): Promise<PaginatedResponse<ListingDto>> {
    const { data } = await this._axiosInstance.get<
      PaginatedResponse<ListingDto>
    >('listing', {
      params,
    });

    return data;
  }

  async getListingDetails(
    listingId: string,
    params?: object,
  ): Promise<ListingDto> {
    const { data } = await this._axiosInstance.get<ListingDto>(
      `listing/${listingId}`,
      {
        params,
      },
    );

    return data;
  }

  async mutateFavoriteListings(
    action: FavoriteListingAction,
    params?: object,
  ): Promise<void> {
    const { data } = await this._axiosInstance.post<void>(
      'listing/favorites',
      action,
      {
        params,
      },
    );

    return data;
  }

  async createListing(formData: FormData, params?: object): Promise<void> {
    await this._axiosInstance.post<void>('listing', formData, {
      params,
    });
  }

  async login(loginDto: LoginDto, params?: object): Promise<AuthDto> {
    const res = await this._axiosInstance.post<AuthDto>(
      'auth/login',
      loginDto,
      { params },
    );
    return res.data;
  }

  async register(registerDto: RegisterDto, params?: object): Promise<AuthDto> {
    const res = await this._axiosInstance.post<AuthDto>(
      'auth/register',
      registerDto,
      { params },
    );
    return res.data;
  }

  async refresh(jwtRes: AuthDto, params?: object): Promise<AuthDto> {
    const res = await this._axiosInstance.post<AuthDto>(
      'auth/refresh',
      jwtRes,
      { params },
    );
    return res.data;
  }

  async getUser(userId: string, params?: object): Promise<User> {
    const res = await this._axiosInstance.get<User>('user/' + userId, {
      params,
    });
    return res.data;
  }

  async getUsers(params?: object): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.get<PaginatedResponse<User>>('user', {
      params,
    });
    return res.data;
  }

  async updateUser(
    userId: string,
    updateDto: UpdateUserDto,
    params?: object,
  ): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.patch<PaginatedResponse<User>>(
      `user/${userId}`,
      updateDto,
      { params },
    );
    return res.data;
  }

  async deleteUser(userId: string, params?: object): Promise<void> {
    const res = await this._axiosInstance.delete<void>(`user/${userId}`, {
      params,
    });
    return res.data;
  }

  async createUser(createDto: CreateUserDto, params?: object): Promise<void> {
    const res = await this._axiosInstance.post<void>('user', createDto, {
      params,
    });
    return res.data;
  }

  async getListingsStats(
    params: MarketStatisticsQuery,
    additionalParams?: object,
  ): Promise<MarketStatistics> {
    const res = await this._axiosInstance.get<MarketStatistics>(
      'statistics/market',
      {
        params: {
          ...params,
          ...additionalParams,
        },
      },
    );
    return res.data;
  }
}
