import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

import type { JwtResponse, LoginDto, RegisterDto } from '@/lib/auth'
import type {
  CreateListingDto,
  FavoriteListingActionDto,
  Listing,
} from '@/lib/listings'
import type { PaginatedResponse } from '@/lib/paginationData'
import type { UpdateUserDto, User } from '@/lib/user'
import { getUserRoles } from '@/lib/utils'

export default class HttpService {
  private readonly _axiosInstance: AxiosInstance

  constructor(token: string | null) {
    const headers: HeadersInit = {}

    if (token !== null) headers.Authorization = `Bearer ${token}`

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
    })
  }

  public async getListings(
    params?: Object,
  ): Promise<PaginatedResponse<Listing>> {
    const { data } = await this._axiosInstance.get<PaginatedResponse<Listing>>(
      'listing',
      {
        params,
      },
    )

    return data
  }

  public async getListingDetails(
    listingId: string,
    params?: Object,
  ): Promise<Listing> {
    const { data } = await this._axiosInstance.get<Listing>(
      `listing/${listingId}`,
      {
        params,
      },
    )

    return data
  }

  public async mutateFavoriteListings(
    action: FavoriteListingActionDto,
    params?: Object,
  ): Promise<void> {
    const { data } = await this._axiosInstance.post<void>(
      'listing/favorites',
      action,
      {
        params,
      },
    )

    return data
  }

  public async createListing(
    createDto: CreateListingDto,
    params?: Object,
  ): Promise<void> {
    await this._axiosInstance.post<void>('listing', createDto, {
      params,
    })
  }

  public async login(
    loginDto: LoginDto,
    params?: Object,
  ): Promise<JwtResponse> {
    const res = await this._axiosInstance.post<JwtResponse>(
      'auth/login',
      loginDto,
      { params },
    )
    return res.data
  }

  public async register(
    registerDto: RegisterDto,
    params?: Object,
  ): Promise<JwtResponse> {
    const res = await this._axiosInstance.post<JwtResponse>(
      'auth/register',
      registerDto,
      { params },
    )
    return res.data
  }

  public async refresh(
    jwtRes: JwtResponse,
    params?: Object,
  ): Promise<JwtResponse> {
    const res = await this._axiosInstance.post<JwtResponse>(
      'auth/refresh',
      jwtRes,
      { params },
    )
    return res.data
  }

  public async getUsers(params?: Object): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.get<PaginatedResponse<User>>('user', {
      params,
    })
    res.data.items.forEach((u: any) => (u.role = getUserRoles(u.role as any)))
    return res.data
  }

  public async updateUser(
    userId: string,
    updateDto: UpdateUserDto,
    params?: Object,
  ): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.patch<PaginatedResponse<User>>(
      `user/${userId}`,
      updateDto,
      { params },
    )
    return res.data
  }

  public async deleteUser(userId: string, params?: Object): Promise<void> {
    const res = await this._axiosInstance.delete<void>(`user/${userId}`, {
      params,
    })
    return res.data
  }
}
